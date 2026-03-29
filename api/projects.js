// /api/projects.js - Vercel Serverless Function
// This handles GET /api/projects requests

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('ERROR: Supabase credentials are missing');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Add CORS headers
const setCorsHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
};

module.exports = async (req, res) => {
    // Set CORS headers
    setCorsHeaders(res);

    // Handle OPTIONS requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        // Get ID from query parameters (for fetching single project)
        const { id } = req.query;

        if (id) {
            // Fetch single project
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Supabase error:', error);
                return res.status(500).json({
                    error: 'Failed to fetch project',
                    details: error.message
                });
            }

            if (!data) {
                return res.status(404).json({ error: 'Project not found' });
            }

            return res.status(200).json(data);
        }

        // Fetch all projects
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({
                error: 'Failed to fetch projects',
                details: error.message
            });
        }

        return res.status(200).json(data || []);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
};
