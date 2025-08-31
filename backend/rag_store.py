# backend/rag_store.py
import os
from typing import List, Tuple
import PyPDF2
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pickle


# Simple in-memory store
class RAGStore:
    def __init__(self):
        self.doc_texts = []  # list of full-page or chunk texts
        self.doc_meta = (
            []
        )  # metadata for each chunk: dicts {filename, page, start_char, end_char}
        self.vectorizer = None
        self.tfidf_matrix = None
        self.indexed_files = set()  # track which files have been indexed

    def clear_all_documents(self):
        """Clear all indexed documents and reset the vectorizer."""
        self.doc_texts = []
        self.doc_meta = []
        self.vectorizer = None
        self.tfidf_matrix = None
        self.indexed_files = set()

    def remove_document(self, filename: str):
        """Remove all chunks for a specific document."""
        # Find indices of chunks belonging to this file
        indices_to_remove = []
        for i, meta in enumerate(self.doc_meta):
            if meta["filename"] == filename:
                indices_to_remove.append(i)

        # Remove in reverse order to maintain indices
        for i in reversed(indices_to_remove):
            del self.doc_texts[i]
            del self.doc_meta[i]

        # Remove from indexed files set
        self.indexed_files.discard(filename)

        # Refit vectorizer with remaining documents
        self._fit_vectorizer()

    def is_document_indexed(self, filename: str) -> bool:
        """Check if a document is already indexed."""
        return filename in self.indexed_files

    def parse_pdf(self, path: str) -> List[Tuple[int, str]]:
        """Return list of (page_number, text) for the PDF."""
        texts = []
        with open(path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for i, page in enumerate(reader.pages, start=1):
                text = page.extract_text() or ""
                texts.append((i, text))
        return texts

    def chunk_page_text(
        self,
        page_text: str,
        page_no: int,
        filename: str,
        chunk_size_chars: int = 1000,
        overlap: int = 200,
    ):
        """Split a page into overlapping character chunks; store with metadata."""
        start = 0
        total = len(page_text)
        while start < total:
            end = min(total, start + chunk_size_chars)
            snippet = page_text[start:end].strip()
            if snippet:
                self.doc_texts.append(snippet)
                self.doc_meta.append(
                    {
                        "filename": filename,
                        "page": page_no,
                        "start_char": start,
                        "end_char": end,
                    }
                )
            start += chunk_size_chars - overlap

    def index_pdf(self, file_path: str, filename: str = None):
        """Parse PDF, chunk pages, and (re)compute TF-IDF index."""
        filename = filename or os.path.basename(file_path)

        # If this file is already indexed, remove it first
        if self.is_document_indexed(filename):
            print(f"Document {filename} already indexed, removing old version...")
            self.remove_document(filename)

        # Add the file to indexed files set
        self.indexed_files.add(filename)

        parsed = self.parse_pdf(file_path)
        for page_no, text in parsed:
            if not text.strip():
                continue
            # naive paragraph split then chunk
            # for simplicity we chunk the page (keeps metadata simple)
            self.chunk_page_text(text, page_no, filename)
        self._fit_vectorizer()

    def _fit_vectorizer(self):
        if not self.doc_texts:
            self.vectorizer = None
            self.tfidf_matrix = None
            return
        self.vectorizer = TfidfVectorizer(stop_words="english", max_features=15000)
        self.tfidf_matrix = self.vectorizer.fit_transform(self.doc_texts)

    def retrieve(self, query: str, top_k: int = 5):
        """Return top_k chunks (with meta and score) for the query using cosine similarity."""
        if self.vectorizer is None or self.tfidf_matrix is None:
            return []
        q_vec = self.vectorizer.transform([query])
        sims = cosine_similarity(q_vec, self.tfidf_matrix).flatten()
        top_idx = np.argsort(-sims)[:top_k]
        results = []
        for idx in top_idx:
            if sims[idx] <= 0:
                continue
            results.append(
                {
                    "score": float(sims[idx]),
                    "text": self.doc_texts[idx],
                    "meta": self.doc_meta[idx],
                }
            )
        return results

    # OPTIONAL: persist / load store to disk (useful for larger projects)
    def save_to_disk(self, path: str):
        with open(path, "wb") as f:
            pickle.dump(
                {
                    "texts": self.doc_texts,
                    "meta": self.doc_meta,
                    "vectorizer": self.vectorizer,
                    "tfidf": self.tfidf_matrix,
                },
                f,
            )

    def load_from_disk(self, path: str):
        with open(path, "rb") as f:
            data = pickle.load(f)
        self.doc_texts = data["texts"]
        self.doc_meta = data["meta"]
        self.vectorizer = data["vectorizer"]
        self.tfidf_matrix = data["tfidf"]
