// Environment Configuration
const config = {
  development: {
    API_BASE: import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000",
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_FILE_TYPES: ["application/pdf"],
    UPLOAD_TIMEOUT: 30000, // 30 seconds
  },
  production: {
    API_BASE:
      import.meta.env.VITE_API_BASE ||
      "https://pdf-rag-backend-u3ba.onrender.com",
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_FILE_TYPES: ["application/pdf"],
    UPLOAD_TIMEOUT: 60000, // 60 seconds
  },
};

// Determine environment
const environment = import.meta.env.MODE || "development";

// Export configuration
export default config[environment];
