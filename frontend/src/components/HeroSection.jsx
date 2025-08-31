import React from "react";
import { FileText, Sparkles, MessageCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center mb-12">
      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <FileText className="w-10 h-10 text-primary-600" />
      </div>
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Transform Your PDFs into Conversations
      </h2>
      <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
        Upload any PDF document and start having intelligent conversations with
        your content. Get instant answers, summaries, and insights powered by
        advanced AI.
      </p>
      <p className="text-lg text-primary-600 mb-8 font-medium">
        Made by{" "}
        <a
          href="https://www.linkedin.com/in/nikhil304/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-700 underline transition-colors"
        >
          Nikhil Shrivastava
        </a>
      </p>

      {/* Feature Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Upload PDF</h3>
          <p className="text-sm text-gray-600">
            Drag & drop or select your PDF document
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">AI Processing</h3>
          <p className="text-sm text-gray-600">
            Our AI analyzes and indexes your content
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <MessageCircle className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Start Chatting</h3>
          <p className="text-sm text-gray-600">
            Ask questions and get intelligent answers
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
