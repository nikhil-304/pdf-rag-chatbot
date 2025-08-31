import React, { useState } from "react";
import { Download, FileText, ExternalLink, RefreshCw } from "lucide-react";

const HybridPdfViewer = ({ pdfUrl, fileName }) => {
  const [viewMode, setViewMode] = useState("iframe"); // "iframe", "object", "embed"
  const [error, setError] = useState(false);

  const downloadPdf = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openInNewTab = () => {
    window.open(pdfUrl, "_blank");
  };

  const handleIframeError = () => {
    setViewMode("object");
  };

  const handleObjectError = () => {
    setViewMode("embed");
  };

  const handleEmbedError = () => {
    setError(true);
  };

  const resetViewer = () => {
    setError(false);
    setViewMode("iframe");
  };

  if (!pdfUrl) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 rounded-xl">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No PDF to display</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 rounded-xl">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-600 font-medium mb-2">PDF Display Issue</p>
          <p className="text-gray-600 text-sm mb-4">
            Your browser may not support PDF viewing. You can download the file
            or open it in a new tab.
          </p>
          <div className="flex space-x-2 justify-center mb-4">
            <button
              onClick={downloadPdf}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={openInNewTab}
              className="inline-flex items-center space-x-2 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open</span>
            </button>
          </div>
          <button
            onClick={resetViewer}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  const renderPdfViewer = () => {
    const commonProps = {
      className: "w-full h-full border-0",
      title: fileName || "PDF Document",
    };

    switch (viewMode) {
      case "iframe":
        return (
          <iframe
            {...commonProps}
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            onError={handleIframeError}
            onLoad={() => console.log("PDF loaded via iframe")}
          />
        );
      case "object":
        return (
          <object
            {...commonProps}
            data={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            type="application/pdf"
            onError={handleObjectError}
          >
            <p>Your browser doesn't support PDF viewing.</p>
          </object>
        );
      case "embed":
        return (
          <embed
            {...commonProps}
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            type="application/pdf"
            onError={handleEmbedError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200">
      {/* PDF Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-700 truncate max-w-48">
            {fileName || "document.pdf"}
          </span>
          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
            {viewMode}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={openInNewTab}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
            title="Open in New Tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={resetViewer}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
            title="Refresh Viewer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-2"></div>
          <button
            onClick={downloadPdf}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 bg-gray-100 relative">{renderPdfViewer()}</div>
    </div>
  );
};

export default HybridPdfViewer;
