import React from "react";

const AuthorSection = () => {
  return (
    <div className="mt-20 text-center">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">👨‍💻</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          About the Creator
        </h3>
        <p className="text-gray-600 mb-4">
          This intelligent PDF chat application was crafted with passion and
          expertise by
        </p>
        <div className="text-lg font-semibold text-primary-600 mb-4">
          <a
            href="https://www.linkedin.com/in/nikhil304/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-700 transition-colors"
          >
            Nikhil Shrivastava
          </a>
        </div>
        <p className="text-sm text-gray-500">
          Connect with me on LinkedIn to explore more innovative projects and
          collaborations
        </p>
      </div>
    </div>
  );
};

export default AuthorSection;
