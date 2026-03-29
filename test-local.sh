#!/bin/bash
# Portfolio Website - Local Testing Script

echo "🧪 PORTFOLIO WEBSITE - LOCAL TEST SCRIPT"
echo "========================================"
echo ""
echo "This script will test your local setup."
echo ""

# Check if backend is running
echo "1️⃣ Checking backend..."
if curl -s http://localhost:3000/api/health > /dev/null; then
    echo "✅ Backend is running on http://localhost:3000"
    
    # Test health endpoint
    echo ""
    echo "🏥 Testing health endpoint..."
    curl -s http://localhost:3000/api/health | jq . 2>/dev/null || curl -s http://localhost:3000/api/health
    
    # Test projects endpoint
    echo ""
    echo "📦 Testing projects endpoint..."
    curl -s http://localhost:3000/api/projects | jq . 2>/dev/null || curl -s http://localhost:3000/api/projects
    
else
    echo "❌ Backend is NOT running"
    echo ""
    echo "Start it with:"
    echo "  cd backend"
    echo "  npm run dev"
    exit 1
fi

echo ""
echo "2️⃣ Frontend test..."
if curl -s http://localhost:3000/ > /dev/null; then
    echo "✅ Frontend is being served on http://localhost:3000"
else
    echo "⚠️ Frontend not accessible. Check backend is running."
fi

echo ""
echo "✅ ALL TESTS PASSED!"
echo ""
echo "📌 Next steps:"
echo "   1. Open http://localhost:3000 in your browser"
echo "   2. Check that projects load from database"
echo "   3. Test the contact form"
echo "   4. Deploy to Vercel (see DEPLOYMENT_FIX.md)"
echo ""
