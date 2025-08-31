import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, AlertTriangle, Info } from "lucide-react";
import { askQuestion } from "../api";

export default function ChatBox({ enabled, messages, addMessage }) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!q.trim()) return;

    const question = q.trim();
    setQ("");
    addMessage("You", question);
    setLoading(true);

    try {
      const res = await askQuestion(question, 5);
      addMessage("Assistant", res.answer);
      if (res.sources && res.sources.length > 0) {
        const sourceInfo = res.sources
          .map((s) => `${s.filename} (page ${s.page})`)
          .join(", ");
        addMessage("System", `Sources: ${sourceInfo}`);
      }
    } catch (err) {
      console.error(err);
      addMessage("System", "Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [q]);

  const getMessageIcon = (role) => {
    switch (role) {
      case "You":
        return <User className="w-4 h-4" />;
      case "Assistant":
        return <Bot className="w-4 h-4" />;
      case "System":
        return <Info className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getMessageStyles = (role) => {
    switch (role) {
      case "You":
        return "bg-primary-600 text-white ml-auto";
      case "Assistant":
        return "bg-white text-gray-900 border border-gray-200";
      case "System":
        return "bg-gray-100 text-gray-700 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getMessageContainerStyles = (role) => {
    return role === "You" ? "justify-end" : "justify-start";
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Assistant</h3>
            <p className="text-sm text-gray-600">
              {enabled
                ? "Ready to answer questions about your PDF"
                : "Upload a PDF to start chatting"}
            </p>
          </div>
        </div>
      </div>

      {/* Warning when chat is disabled */}
      {!enabled && (
        <div className="mx-4 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start space-x-2 animate-slide-up">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-amber-800 font-medium text-sm">
              Upload Required
            </p>
            <p className="text-amber-700 text-sm">
              Please upload a PDF document to enable the chat feature.
            </p>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {messages.length === 0 && enabled && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium mb-2">
              Ready to help!
            </p>
            <p className="text-gray-400 text-sm">
              Ask me anything about your uploaded PDF document.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${getMessageContainerStyles(
              message.role
            )} animate-slide-up`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${getMessageStyles(
                message.role
              )}`}
            >
              <div className="flex items-start space-x-2">
                <div className="mt-0.5 flex-shrink-0">
                  {getMessageIcon(message.role)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm whitespace-pre-wrap break-words">
                    {message.text}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start animate-slide-up">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 max-w-[80%]">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-gray-400" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                enabled
                  ? "Ask a question about your PDF..."
                  : "Upload a PDF to start chatting"
              }
              disabled={!enabled || loading}
              rows={1}
              className="w-full resize-none border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              style={{ minHeight: "48px", maxHeight: "120px" }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!enabled || loading || !q.trim()}
            className="p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {enabled && (
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        )}
      </div>
    </div>
  );
}
