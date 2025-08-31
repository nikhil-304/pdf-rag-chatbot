@echo off
REM Production startup script for RAG Chat Application
REM Created by Nikhil Shrivastava

echo ================================
echo RAG Chat Application - Production
echo ================================
echo.

REM Check if .env files exist
if not exist "backend\.env" (
    echo ERROR: Backend .env file not found!
    echo Please copy backend\.env.template to backend\.env and configure your API key
    pause
    exit /b 1
)

if not exist "frontend\.env.local" (
    echo WARNING: Frontend .env.local not found, using defaults
)

echo Setting up backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate

REM Install dependencies
echo Installing Python dependencies...
pip install -r requirements.txt --quiet

echo Backend setup complete!
echo.

REM Start backend in background
echo Starting Flask backend server...
start /B python app.py

REM Wait for backend to start
timeout /t 3 /nobreak >nul

echo Backend server running on http://127.0.0.1:5000
echo.

REM Frontend setup
cd ..\frontend
echo Setting up frontend...

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing Node.js dependencies...
    npm install --silent
)

echo Frontend setup complete!
echo.

REM Start frontend
echo Starting Vite development server...
start /B npm run dev

REM Wait for frontend to start
timeout /t 3 /nobreak >nul

echo.
echo ================================
echo   RAG Chat Application Running!
echo ================================
echo Frontend: http://localhost:3000
echo Backend:  http://127.0.0.1:5000
echo Status:   http://127.0.0.1:5000/status
echo.
echo Upload a PDF and start chatting!
echo.
echo Press any key to stop the application...
pause >nul

REM Cleanup (Note: This is basic cleanup, processes may persist)
echo Shutting down application...
taskkill /f /im python.exe 2>nul
taskkill /f /im node.exe 2>nul
echo Application stopped!
