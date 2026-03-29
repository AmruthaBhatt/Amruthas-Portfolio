// /api/health.js - Health check endpoint
// Simple health check for monitoring

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    res.status(200).json({
        status: 'Server is running',
        environment: process.env.NODE_ENV || 'production',
        timestamp: new Date().toISOString(),
        supabaseConnected: !!process.env.SUPABASE_URL
    });
};
