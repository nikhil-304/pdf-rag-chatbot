import React from "react";
import { MessageCircle, FileText, Sparkles, Trash2 } from "lucide-react";

const Header = ({
  isLandingPage = true,
  uploadedFile = null,
  onUploadNewPdf,
  onClearDocuments,
}) => {
  if (isLandingPage) {
    return (
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PDFChat AI</h1>
                <p className="text-sm text-gray-600">
                  Made by Nikhil Shrivastava
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>PDF Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>AI Chat</span>
              </div>
              <a
                href="https://www.linkedin.com/in/nikhil304/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-primary-600 transition-colors"
              >
                <span>👤Made by Nikhil Shrivastava</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Chat interface header
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">PDFChat AI</h1>
            {uploadedFile ? (
              <p className="text-sm text-gray-600 truncate max-w-[200px] sm:max-w-md">
                Chatting with: {uploadedFile.name}
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Made by Nikhil Shrivastava
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button onClick={onUploadNewPdf} className="btn-secondary text-sm">
            <span className="hidden sm:inline">Upload New PDF</span>
            <span className="sm:hidden">New PDF</span>
          </button>
          <button
            onClick={onClearDocuments}
            className="btn-secondary text-sm flex items-center space-x-1"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear All</span>
          </button>
          <a
            href="https://www.linkedin.com/in/nikhil304/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm flex items-center space-x-1 hover:bg-primary-100"
          >
            <span className="hidden sm:inline">👤Made by Nikhil</span>
            <span className="sm:hidden">👤</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
