import { useState } from "react";
import LandingPage from "./components/LandingPage";
import ChatInterface from "./components/ChatInterface";
import { clearDocuments } from "./api";

function App() {
  const [messages, setMessages] = useState([]);
  const [chatEnabled, setChatEnabled] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const addMessage = (role, text) => {
    setMessages((prev) => [...prev, { role, text }]);
  };

  const handlePdfUploaded = () => {
    setChatEnabled(true);
  };

  const handleFileUploaded = (file) => {
    setUploadedFile(file);
    // For demo purposes, we'll use the file object directly
    // In a real app, you'd get the URL from your backend after upload
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
  };

  const handleClearDocuments = async () => {
    try {
      await clearDocuments();
      // Reset all state
      setMessages([]);
      setChatEnabled(false);
      setUploadedFile(null);
      setPdfUrl(null);
      addMessage("System", "🗑️ All documents cleared successfully");
    } catch (err) {
      console.error(err);
      addMessage(
        "System",
        `❌ Failed to clear documents: ${err.message || err}`
      );
    }
  };

  const handleUploadNewPdf = () => {
    setChatEnabled(false);
    setUploadedFile(null);
    setPdfUrl(null);
    setMessages([]);
  };

  // Initial state - show landing page
  if (!chatEnabled) {
    return (
      <LandingPage
        onPdfUploaded={handlePdfUploaded}
        addMessage={addMessage}
        onFileUploaded={handleFileUploaded}
      />
    );
  }

  // Chat interface with PDF viewer
  return (
    <ChatInterface
      messages={messages}
      addMessage={addMessage}
      chatEnabled={chatEnabled}
      uploadedFile={uploadedFile}
      pdfUrl={pdfUrl}
      onUploadNewPdf={handleUploadNewPdf}
      onClearDocuments={handleClearDocuments}
    />
  );
}

export default App;
