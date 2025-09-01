# 🤖 RAG Chat - AI-Powered PDF Chat Application

A **production-ready** RAG (Retrieval-Augmented Generation) chat system that enables intelligent conversations with PDF documents using Google Gemini AI.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Python](https://img.shields.io/badge/Python-3.8+-green?logo=python)
![Flask](https://img.shields.io/badge/Flask-Latest-orange?logo=flask)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4+-blue?logo=tailwindcss)


## ✨ Key Features

- 🔍 **Smart PDF Analysis** - Upload and chat with any PDF document
- 🤖 **AI-Powered Responses** - Leverages Google Gemini AI for accurate answers
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- 🔒 **Secure Processing** - Documents processed locally with proper security
- ⚡ **Fast Retrieval** - Efficient vector search and document chunking
- 🎨 **Modern Interface** - Clean UI built with React and Tailwind CSS

## 📸 Live Screenshots

Below are some live screenshots of the project interface:

<div align="center">
    <img src="screenshots/Pdf%20RAG%20Chat%20SS1.png" alt="Screenshot 1" width="600" />
    <br>
    <img src="screenshots/Pdf%20RAG%20Chat%20SS2.png" alt="Screenshot 2" width="600" />
    <br>
    <img src="screenshots/Pdf%20RAG%20Chat%20SS3.png" alt="Screenshot 3" width="600" />
</div>

## 🚀 Quick Start

### Option 1: Production Startup (Recommended)
```bash
# Windows
start-production.bat

# Linux/Mac
./start-production.sh
```

### Option 2: Manual Setup
```bash
# 1. Setup environment variables
cp backend/.env.template backend/.env
cp frontend/.env.template frontend/.env.local
# Add your Google Gemini API key to .env files

# 2. Start Backend
cd backend
pip install -r requirements.txt
python app.py

# 3. Start Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## 📋 Prerequisites

- **Python 3.8+** - Backend runtime
- **Node.js 16+** - Frontend development
- **Google Gemini API Key** - [Get one here](https://makersuite.google.com/app/apikey)

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- Lucide React Icons
- Responsive Design

**Backend:**
- Python Flask
- Google Gemini AI
- Vector Embeddings
- PDF Processing

**Architecture:**
- RESTful API
- Component-based Frontend
- RAG (Retrieval-Augmented Generation)
- Environment-based Configuration

## 🏗️ Project Architecture

```
rag-chat/
├── backend/                 # Flask API Server
│   ├── app.py              # Main Flask application
│   ├── rag_store.py        # RAG processing & vector search
│   ├── requirements.txt    # Python dependencies
│   └── uploads/            # PDF file storage
│
└── frontend/               # React Application
    ├── src/
    │   ├── App.jsx         # Main app (80 lines - optimized!)
    │   ├── api.js          # API communication
    │   └── components/     # 10 specialized components
    ├── package.json        # Node.js dependencies
    └── vite.config.js      # Build configuration
```

## 🚀 Production Deployment

### Quick Deploy Options
- **Frontend**: [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/)
- **Backend**: [Railway](https://railway.app/) or [Render](https://render.com/)

### Environment Configuration
```bash
# Backend (.env)
GEMINI_API_KEY=your_api_key_here
FLASK_ENV=production

# Frontend (.env.local)
VITE_API_BASE=https://your-backend-url.com
```

## 🔐 Security Features

- ✅ Environment variables for API keys
- ✅ Comprehensive .gitignore
- ✅ CORS configuration
- ✅ Secure file upload handling
- ✅ No sensitive data in repository

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Nikhil Shrivastava**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nikhil304/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nikhil-304)

*A passionate developer creating innovative AI solutions for document processing and intelligent conversations.*

---

⭐ **Star this repository if you found it helpful!**

📧 **Questions?** Feel free to reach out via LinkedIn or create an issue in this repository.
