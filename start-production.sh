#!/bin/bash

# Production startup script for RAG Chat Application
# Created by Nikhil Shrivastava

echo "🚀 Starting RAG Chat Application - Production Mode"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ️${NC} $1"
}

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    print_error "Backend .env file not found!"
    print_info "Copy backend/.env.template to backend/.env and configure your API key"
    exit 1
fi

if [ ! -f "frontend/.env.local" ]; then
    print_warning "Frontend .env.local not found, using defaults"
fi

# Backend setup
print_info "Setting up backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    print_info "Creating Python virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
print_info "Activating virtual environment..."
source venv/Scripts/activate 2>/dev/null || source venv/bin/activate

# Install dependencies
print_info "Installing Python dependencies..."
pip install -r requirements.txt --quiet

print_status "Backend setup complete!"

# Start backend in background
print_info "Starting Flask backend server..."
python app.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Check if backend is running
if curl -s http://127.0.0.1:5000/status > /dev/null; then
    print_status "Backend server running on http://127.0.0.1:5000"
else
    print_error "Backend failed to start!"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Frontend setup
cd ../frontend
print_info "Setting up frontend..."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_info "Installing Node.js dependencies..."
    npm install --silent
fi

print_status "Frontend setup complete!"

# Start frontend
print_info "Starting Vite development server..."
npm run dev &
FRONTEND_PID=$!

# Wait for frontend to start
sleep 3

print_status "Frontend server running on http://localhost:3000"

echo ""
echo "🎉 RAG Chat Application is now running!"
echo "========================================"
echo "📖 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://127.0.0.1:5000"
echo "📊 Status:   http://127.0.0.1:5000/status"
echo ""
echo "💡 Upload a PDF and start chatting!"
echo ""
echo "To stop the application, press Ctrl+C"

# Function to cleanup on exit
cleanup() {
    echo ""
    print_info "Shutting down application..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    print_status "Application stopped successfully!"
    exit 0
}

# Set trap to cleanup on exit
trap cleanup INT TERM

# Wait for processes
wait
