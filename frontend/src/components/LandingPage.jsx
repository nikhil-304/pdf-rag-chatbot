import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeatureStats from "./FeatureStats";
import AuthorSection from "./AuthorSection";
import PdfUpload from "./PdfUpload";

const LandingPage = ({ onPdfUploaded, addMessage, onFileUploaded }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header isLandingPage={true} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroSection />

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <PdfUpload
              onUploaded={onPdfUploaded}
              addMessage={addMessage}
              onFileUploaded={onFileUploaded}
            />
          </div>
        </div>

        <FeatureStats />
        <AuthorSection />
      </main>
    </div>
  );
};

export default LandingPage;
