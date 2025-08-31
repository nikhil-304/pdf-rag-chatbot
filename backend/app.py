from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from rag_store import RAGStore
import logging

# Load API key from .env
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

# Validate critical environment variables
if not api_key:
    raise ValueError("GEMINI_API_KEY environment variable is required but not set")

app = Flask(__name__)

# Configure CORS with environment-specific origins
cors_origins = os.getenv(
    "CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
).split(",")
CORS(app, origins=cors_origins)

# Configure logging
logging.basicConfig(
    level=logging.INFO if os.getenv("FLASK_ENV") == "production" else logging.DEBUG,
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)
logger = logging.getLogger(__name__)

# Configure Gemini
genai.configure(api_key=api_key)

# Initialize RAG store
rag_store = RAGStore()

# Configure upload folder
UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "uploads")
MAX_UPLOAD_SIZE = int(os.getenv("MAX_UPLOAD_SIZE", 10485760))  # 10MB default

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config["MAX_CONTENT_LENGTH"] = MAX_UPLOAD_SIZE


# Auto-load existing PDFs on startup
def load_existing_pdfs():
    """Load and index any existing PDFs in the uploads folder"""
    try:
        if os.path.exists(UPLOAD_FOLDER):
            pdf_files = [
                f for f in os.listdir(UPLOAD_FOLDER) if f.lower().endswith(".pdf")
            ]
            print(f"Found {len(pdf_files)} existing PDF files: {pdf_files}")

            # Only load if there are PDFs and we don't have documents already indexed
            if pdf_files and len(rag_store.doc_texts) == 0:
                # Clear existing documents to start fresh
                rag_store.clear_all_documents()

                for pdf_file in pdf_files:
                    filepath = os.path.join(UPLOAD_FOLDER, pdf_file)
                    print(f"Indexing existing PDF: {pdf_file}")

                    try:
                        # Test if file can be read
                        with open(filepath, "rb") as test_file:
                            test_file.read(10)

                        # Index the PDF
                        rag_store.index_pdf(filepath, pdf_file)
                        print(f"Successfully indexed {pdf_file}")

                    except Exception as pdf_error:
                        print(f"Error indexing {pdf_file}: {pdf_error}")
                        continue

                print(f"Loaded {len(rag_store.doc_texts)} document chunks total")
                print(f"Vectorizer created: {rag_store.vectorizer is not None}")

                # Test retrieval if we have documents
                if len(rag_store.doc_texts) > 0:
                    test_results = rag_store.retrieve("test", top_k=1)
                    print(f"Test retrieval returned {len(test_results)} results")
            else:
                print(
                    "Skipping auto-load: either no PDFs found or documents already indexed"
                )
        else:
            print(f"Uploads folder {UPLOAD_FOLDER} does not exist")

    except Exception as e:
        print(f"Error loading existing PDFs: {e}")
        import traceback

        traceback.print_exc()


# Load existing PDFs on startup
load_existing_pdfs()


ALLOWED_EXTENSIONS = {"pdf"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/")
def home():
    return {"message": "Hello from Flask & Gemini RAG Chat"}


@app.route("/status", methods=["GET"])
def status():
    """Get status of indexed documents"""
    try:
        indexed_files = {}
        for meta in rag_store.doc_meta:
            filename = meta["filename"]
            if filename not in indexed_files:
                indexed_files[filename] = 0
            indexed_files[filename] += 1

        return jsonify(
            {
                "total_chunks": len(rag_store.doc_texts),
                "indexed_files": indexed_files,
                "has_vectorizer": rag_store.vectorizer is not None,
                "indexed_file_set": list(rag_store.indexed_files),
            }
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/clear", methods=["POST"])
def clear_documents():
    """Clear all indexed documents"""
    try:
        rag_store.clear_all_documents()
        return jsonify({"message": "All documents cleared successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def sync_rag_with_files():
    """Sync RAG store with actual files in uploads folder"""
    try:
        # Get list of actual PDF files in uploads folder
        actual_files = set()
        if os.path.exists(UPLOAD_FOLDER):
            actual_files = {
                f for f in os.listdir(UPLOAD_FOLDER) if f.lower().endswith(".pdf")
            }

        # Get list of indexed files in RAG store
        indexed_files = rag_store.indexed_files.copy()

        # Remove documents that no longer exist in the uploads folder
        for filename in indexed_files:
            if filename not in actual_files:
                print(f"Removing {filename} from index (file no longer exists)")
                rag_store.remove_document(filename)

        # Index new files that aren't in the RAG store yet
        for filename in actual_files:
            if not rag_store.is_document_indexed(filename):
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                print(f"Indexing new file: {filename}")
                rag_store.index_pdf(filepath, filename)

        print(f"Sync complete. Indexed files: {rag_store.indexed_files}")

    except Exception as e:
        print(f"Error syncing RAG with files: {e}")


@app.route("/upload", methods=["POST"])
def upload_pdf():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        # Check if request wants to replace all documents (default behavior)
        replace_all = request.form.get("replace_all", "true").lower() == "true"

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(UPLOAD_FOLDER, filename)

            # If replace_all is true, clear all previous documents and files
            if replace_all:
                print("Replacing all previous documents...")
                # Clear all indexed documents
                rag_store.clear_all_documents()

                # Delete all files in uploads folder except the new one
                if os.path.exists(UPLOAD_FOLDER):
                    for existing_file in os.listdir(UPLOAD_FOLDER):
                        if existing_file.lower().endswith(".pdf"):
                            existing_path = os.path.join(UPLOAD_FOLDER, existing_file)
                            try:
                                os.remove(existing_path)
                                print(f"Removed previous file: {existing_file}")
                            except Exception as e:
                                print(f"Error removing {existing_file}: {e}")

            # Save the new file
            file.save(filepath)

            # Index the PDF with RAG store
            rag_store.index_pdf(filepath, filename)

            return jsonify(
                {
                    "message": "PDF uploaded and indexed successfully",
                    "filename": filename,
                    "replaced_previous": replace_all,
                    "total_documents": len(rag_store.doc_texts),
                }
            )
        else:
            error_msg = "Invalid file type. Please upload a PDF."
            return jsonify({"error": error_msg}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        query = data.get("query", data.get("message", ""))
        k = data.get("k", 5)

        if not query:
            return jsonify({"error": "No query provided"}), 400

        # First, sync RAG store with actual files in uploads folder
        sync_rag_with_files()

        # Debug: Check if we have any documents indexed
        print(f"Number of indexed documents: {len(rag_store.doc_texts)}")
        print(f"Query: {query}")
        print(f"Indexed files: {rag_store.indexed_files}")

        # Check if we have any documents at all
        if len(rag_store.doc_texts) == 0:
            # Try to reload PDFs in case they weren't loaded on startup
            print("No documents found, trying to reload PDFs...")
            load_existing_pdfs()

            if len(rag_store.doc_texts) == 0:
                return (
                    jsonify(
                        {
                            "answer": "I don't have any documents loaded yet. Please "
                            "upload PDF documents using the upload feature, "
                            "then I can answer questions about their content.",
                            "sources": [],
                            "context_used": False,
                            "debug_info": {
                                "total_docs": 0,
                                "has_vectorizer": False,
                                "upload_folder_exists": os.path.exists(UPLOAD_FOLDER),
                                "files_in_upload": (
                                    os.listdir(UPLOAD_FOLDER)
                                    if os.path.exists(UPLOAD_FOLDER)
                                    else []
                                ),
                            },
                        }
                    ),
                    200,
                )

        # Retrieve relevant documents using RAG
        relevant_docs = rag_store.retrieve(query, top_k=k)
        print(f"Retrieved {len(relevant_docs)} relevant documents")

        # Prepare context for Gemini
        context = ""
        sources = []
        if relevant_docs:
            context = "\n\nRelevant information from uploaded documents:\n"
            for i, doc in enumerate(relevant_docs, 1):
                context += f"\n{i}. {doc['text']}\n"
                sources.append(
                    {
                        "filename": doc["meta"]["filename"],
                        "page": doc["meta"]["page"],
                        "score": doc["score"],
                    }
                )

        # If no relevant documents found, but we have documents indexed,
        # provide a general response about the documents
        if not relevant_docs and len(rag_store.doc_texts) > 0:
            # Get a sample of text from all documents
            sample_texts = []
            seen_files = set()
            for i, meta in enumerate(rag_store.doc_meta[:10]):  # First 10 chunks
                if meta["filename"] not in seen_files:
                    sample_texts.append(
                        f"From {meta['filename']}: {rag_store.doc_texts[i][:200]}..."
                    )
                    seen_files.add(meta["filename"])

            context = "\n\nAvailable document content:\n" + "\n\n".join(sample_texts)
            sources = [
                {"filename": f, "page": "multiple", "score": 0.0} for f in seen_files
            ]

        # Create enhanced prompt for Gemini
        if not context and len(rag_store.doc_texts) > 0:
            # Fallback: use first few document chunks if no specific matches
            context = "\n\nDocument content:\n"
            for i in range(min(5, len(rag_store.doc_texts))):
                context += f"\n{i+1}. {rag_store.doc_texts[i]}\n"
                if not sources:
                    sources.append(
                        {
                            "filename": rag_store.doc_meta[i]["filename"],
                            "page": rag_store.doc_meta[i]["page"],
                            "score": 0.5,
                        }
                    )

        prompt = f"""Based on the following context from uploaded documents, please answer the question: "{query}"

{context}

Please provide a helpful and accurate answer based on the information provided. If the context doesn't contain relevant information, please say so and provide a general response."""

        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)

        return jsonify(
            {
                "answer": response.text,
                "sources": sources,
                "context_used": len(relevant_docs) > 0,
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)
