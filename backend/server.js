const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ===== Middleware =====
// Enable CORS for frontend communication
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5500',
    credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

// ===== Routes =====
// Import route handlers
const projectsRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');

// Use routes
app.use('/api/projects', projectsRoutes);
app.use('/api/contact', contactRoutes);

// ===== Health Check Endpoint =====
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
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

// ===== 404 Handler =====
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// ===== Start Server =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`📝 API Documentation:`);
    console.log(`   - GET /api/projects - Fetch all projects`);
    console.log(`   - POST /api/contact - Submit contact form`);
    console.log(`   - GET /api/health - Health check`);
});

module.exports = app;
