#!/bin/bash

echo "🚀 Starting Event Management System..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Shutting down servers...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup INT

echo -e "${BLUE}📦 Checking if dependencies are installed...${NC}"

# Check backend dependencies
if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Backend dependencies not found. Installing...${NC}"
    cd backend && npm install && cd ..
fi

# Check frontend dependencies
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Frontend dependencies not found. Installing...${NC}"
    cd frontend && npm install && cd ..
fi

echo ""
echo -e "${GREEN}✅ Dependencies ready!${NC}"
echo ""

# Start Backend
echo -e "${BLUE}🔧 Starting Backend Server...${NC}"
cd backend
node server.js &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 2

# Check if backend started successfully
if kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "${GREEN}✅ Backend running on http://localhost:5001${NC}"
else
    echo -e "${YELLOW}⚠️  Backend failed to start. Port 5001 might be in use.${NC}"
    echo "   Run: lsof -ti:5001 | xargs kill -9"
    exit 1
fi

echo ""

# Start Frontend
echo -e "${BLUE}⚛️  Starting Frontend...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo -e "${GREEN}🎉 Both servers are starting!${NC}"
echo ""
echo -e "${GREEN}📱 Frontend: http://localhost:5173${NC}"
echo -e "${GREEN}🔌 Backend:  http://localhost:5001${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"
echo ""

# Wait for processes
wait
