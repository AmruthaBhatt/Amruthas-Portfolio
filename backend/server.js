const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ===== Middleware =====
// Enable CORS for frontend communication (support multiple origins)
app.use(cors({
    origin: [
        'http://localhost:5500',
        'http://localhost:3000',
        'http://127.0.0.1:5500',
        process.env.CLIENT_URL || 'http://localhost:5500',
        // Allow Vercel and other deployments
        /\.vercel\.app$/,
        /\.netlify\.app$/,
        /localhost/
    ],
    credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// ===== Routes =====
// Import route handlers
const projectsRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');

// Use routes
app.use('/api/projects', projectsRoutes);
app.use('/api/contact', contactRoutes);

// ===== Health Check Endpoint =====
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'Server is running',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// ===== Root Endpoint (Frontend) =====
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ===== Error Handling Middleware =====
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production' 
            ? 'Internal Server Error' 
            : err.message
    });
});

// ===== 404 Handler (SPA - serve index.html) =====
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ===== Start Server =====
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`📝 API Documentation:`);
    console.log(`   - GET /api/projects - Fetch all projects`);
    console.log(`   - POST /api/contact - Submit contact form`);
    console.log(`   - GET /api/health - Health check`);
    console.log(`📄 Frontend served at root: http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

module.exports = app;
