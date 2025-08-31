import React from "react";
import { FileText } from "lucide-react";
import Header from "./Header";
import ChatBox from "./ChatBox";
import HybridPdfViewer from "./HybridPdfViewer";

const ChatInterface = ({
  messages,
  addMessage,
  chatEnabled,
  uploadedFile,
  pdfUrl,
  onUploadNewPdf,
  onClearDocuments,
}) => {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header
        isLandingPage={false}
        uploadedFile={uploadedFile}
        onUploadNewPdf={onUploadNewPdf}
        onClearDocuments={onClearDocuments}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Chat Section - Left on desktop, top on mobile */}
        <div className="w-full lg:w-1/2 flex flex-col p-4 lg:p-6">
          <ChatBox
            enabled={chatEnabled}
            messages={messages}
            addMessage={addMessage}
          />
        </div>

        {/* Divider - Only show on desktop */}
        <div className="hidden lg:block w-px bg-gray-300"></div>

        {/* PDF Viewer - Right on desktop, bottom on mobile */}
        <div className="w-full lg:w-1/2 p-4 lg:p-6 min-h-[50vh] lg:min-h-0">
          {pdfUrl ? (
            <HybridPdfViewer pdfUrl={pdfUrl} fileName={uploadedFile?.name} />
          ) : (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  PDF Viewer
                </h3>
                <p className="text-gray-500 mb-4">
                  Your uploaded PDF will be displayed here
                </p>
                <div className="text-sm text-gray-400">
                  • Navigate through pages
                  <br />
                  • Zoom in and out
                  <br />• Download PDF
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
