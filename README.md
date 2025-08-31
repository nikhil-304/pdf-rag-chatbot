# 🤖 RAG Chat - AI-Powered PDF Chat Application

A **production-ready** PDF-based RAG (Retrieval-Augmented Generation) chat system using Flask backend and React frontend.

> **Created by Nikhil Shrivastava** - A professional-grade AI application for intelligent PDF conversations.

## ✨ Features

- 🔍 **Smart PDF Analysis** - Upload any PDF and chat with its content
- 🤖 **AI-Powered Responses** - Powered by Google Gemini AI
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🔒 **Secure & Private** - Documents processed locally
- ⚡ **Fast Processing** - Efficient vector search and retrieval
- 🎨 **Modern UI** - Clean, professional interface with Tailwind CSS

## 🚀 Quick Start

### Production Startup (Recommended)
```bash
# For Windows
start-production.bat

# For Linux/Mac
./start-production.sh
```

### Manual Setup

1. **Environment Setup:**
   ```bash
   cp backend/.env.template backend/.env
   cp frontend/.env.template frontend/.env.local
   # Edit .env files with your Gemini API key
   ```

2. **Backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

3. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📋 Prerequisites

- **Python 3.8+** - Backend runtime
- **Node.js 16+** - Frontend development
- **Google Gemini API Key** - [Get one here](https://makersuite.google.com/app/apikey)

## 🏗️ Project Structure

```
rag-chat/
├── 📚 README.md                   # This file
├── 🔒 SECURITY.md                 # Security guidelines
├── 🚀 DEPLOYMENT.md               # Production deployment guide
├── 🙈 .gitignore                  # Git ignore rules
├── 🎬 start-production.*          # Production startup scripts
├──
├── backend/                       # Flask API server
│   ├── 🐍 app.py                  # Main Flask application
│   ├── 📚 rag_store.py            # RAG logic & vector search
│   ├── 🔧 .env                    # Environment variables (not in git)
│   ├── 📝 .env.template           # Environment template
│   ├── 📦 requirements.txt        # Python dependencies
│   └── 📁 uploads/                # PDF storage (not in git)
│
└── frontend/                      # React application
    ├── 🌐 index.html              # HTML entry point
    ├── 📦 package.json            # Node.js dependencies
    ├── ⚙️ vite.config.js          # Vite configuration
    ├── 🎨 tailwind.config.js      # Tailwind CSS config
    ├── 🔧 .env.local              # Local environment (not in git)
    ├── 📝 .env.template           # Environment template
    └── 📁 src/                    # Source code
        ├── 🚀 main.jsx            # React entry point
        ├── 📱 App.jsx             # Main app component (80 lines!)
        ├── 🔧 config.js           # Configuration management
        ├── 🌐 api.js              # API communication
        └── 📁 components/         # React components (10 components)
            ├── 🏠 LandingPage.jsx # Landing page
            ├── 💬 ChatInterface.jsx # Chat interface
            ├── 📋 Header.jsx      # App header
            ├── 🦸 HeroSection.jsx # Hero content
            ├── 📊 FeatureStats.jsx # Feature stats
            ├── 👨‍💻 AuthorSection.jsx # Author info
            ├── 📤 PdfUpload.jsx   # PDF upload
            ├── 💬 ChatBox.jsx     # Chat component
            ├── 📖 HybridPdfViewer.jsx # PDF viewer
            └── 🛡️ ErrorBoundary.jsx # Error handling
```

## 🎯 Architecture Highlights

### **Clean Component Design:**
- **App.jsx**: Only 80 lines (was 328 lines!)
- **10 Specialized Components**: Proper separation of concerns
- **Modern React**: Hooks, functional components, clean state management

### **Production Features:**
- **Environment Management**: Separate dev/prod configurations
- **Security**: API keys properly managed, comprehensive .gitignore
- **Error Handling**: Graceful error boundaries and validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## � Configuration

### Backend (.env)
```bash
GEMINI_API_KEY=your_actual_api_key_here
FLASK_ENV=development  # Change to 'production' for deployment
CORS_ORIGINS=http://localhost:3000
MAX_UPLOAD_SIZE=10485760
```

### Frontend (.env.local)
```bash
VITE_API_BASE=http://127.0.0.1:5000  # Change for production
```

## 🚀 Production Deployment

### Quick Deploy Options
- **Frontend**: [Vercel](https://vercel.com) (recommended) or [Netlify](https://netlify.com)
- **Backend**: [Railway](https://railway.app) (recommended) or [Render](https://render.com)

### Deployment Steps
1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/rag-chat.git
   git push -u origin main
   ```

2. **Deploy Backend** (Railway example):
   - Connect GitHub repository
   - Set environment variables: `GEMINI_API_KEY`, `FLASK_ENV=production`
   - Auto-deploy from main branch

3. **Deploy Frontend** (Vercel example):
   - Connect GitHub repository
   - Set environment variables: `VITE_API_BASE=https://your-backend-url.railway.app`
   - Auto-deploy from main branch

### Environment Variables for Production
```bash
# Backend
GEMINI_API_KEY=your_api_key
FLASK_ENV=production
FLASK_DEBUG=False
CORS_ORIGINS=https://your-frontend-domain.com

# Frontend
VITE_API_BASE=https://your-backend-domain.com
```

## 🔒 Security & Git

### ✅ Safe to Commit:
- Source code (`.py`, `.jsx`, `.js` files)
- Templates (`.env.template` files)
- Configuration (`package.json`, `requirements.txt`)
- Documentation (`.md` files)

### ❌ Never Commit:
- `.env` files (contain API keys)
- `node_modules/`, `__pycache__/`, `venv/`
- `uploads/` directory (user files)
- Build artifacts (`dist/`, etc.)

- **Python 3.8+** - Backend runtime
- **Node.js 16+** - Frontend development
- **Google Gemini API Key** - [Get one here](https://makersuite.google.com/app/apikey)

## ⚠️ Important Setup
   pip install -r requirements.txt
   ```

3. **Verify your .env file exists with your API key:**
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start the backend server:**
   ```bash
   python run_server.py
   ```
   OR alternatively:
   ```bash
   python app.py
   ```

   The server will start at: `http://127.0.0.1:5000`

### Step 2: Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd rag-chat/frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

   The frontend will start at: `http://localhost:5173` (or similar)

## 📁 Current PDF Files

Your system already has these PDFs loaded:
- `Nikhil_Shrivastava_Resume.pdf`
- `ICEMMSME005.pdf`

## 🔧 API Endpoints

- `GET /` - Health check
- `GET /status` - Check loaded documents status
- `POST /upload` - Upload new PDF files
- `POST /chat` - Ask questions about uploaded documents
- `POST /reload` - Manually reload all PDFs

## 💬 Testing the Chat

Once both servers are running:

1. Open your browser to the frontend URL
2. Try asking questions like:
   - "What skills does the candidate have?"
   - "What is this document about?"
   - "Tell me about the candidate's experience"
   - "What qualifications are mentioned?"

## 🐛 Troubleshooting

### Backend Issues:
- If you get "No documents loaded" error, check the `/status` endpoint
- Use the `/reload` endpoint to force reload PDFs
- Check console output for PDF indexing messages

### Frontend Issues:
- Make sure backend is running on port 5000
- Check browser console for any CORS errors
- Verify API_BASE in `src/api.js` points to correct backend URL

### PDF Processing Issues:
- PDFs should be in `backend/uploads/` folder
- Check if PDFs are readable (not password protected)
- Look at backend console for PDF parsing errors

## 📊 System Status

You can check system status by visiting:
`http://127.0.0.1:5000/status`

This will show:
- Number of document chunks loaded
- Which files are indexed
- Whether the vectorizer is working

## 🔄 Manual Reload

If documents aren't loading, you can force reload by:
```bash
curl -X POST http://127.0.0.1:5000/reload
```

---

## 🎯 Expected Behavior

After starting both servers, you should be able to:
1. ✅ Chat about the content of uploaded PDFs

## 🏭 Production Deployment

### Quick Deploy Links
- **Frontend**: Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
- **Backend**: Deploy to [Railway](https://railway.app), [Render](https://render.com), or [Heroku](https://heroku.com)

### Pre-deployment Checklist
- [ ] Read `SECURITY.md` - **CRITICAL SECURITY SETUP**
- [ ] Read `DEPLOYMENT.md` - Complete deployment guide
- [ ] API keys secured in environment variables
- [ ] CORS configured for production domain
- [ ] Frontend API_BASE updated for production

### Environment Files
```bash
# Copy templates and fill with your values
cp backend/.env.template backend/.env
cp frontend/.env.template frontend/.env.local
```

### Security Status
- ✅ Components properly separated
- ✅ .gitignore configured
- ✅ Environment templates created
- ⚠️ **API keys need to be secured before git push**

## 📁 What to Git Push

### ✅ Include in Git:
```bash
git add backend/app.py backend/rag_store.py backend/requirements*.txt
git add backend/.env.template  # Template only, not .env
git add frontend/src/ frontend/package.json frontend/vite.config.js
git add frontend/.env.template  # Template only
git add *.md *.bat *.sh .gitignore
```

### ❌ Never commit:
- `.env` files (contain API keys)
- `__pycache__/` directories
- `node_modules/`
- `uploads/` directory
- `dist/` build directories

## 🔒 Security Priority
**BEFORE PUSHING TO GIT**: Secure your API keys following the `SECURITY.md` guide.
2. ✅ Get specific answers about skills, qualifications, etc.
3. ✅ Upload new PDF files through the web interface
4. ✅ See relevant document sources in responses

If everything is working correctly, the system will automatically:
- Load existing PDFs on startup
- Index document content for fast retrieval
- Provide context-aware responses using Gemini AI
