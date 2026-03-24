const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();

// ===== Supabase Client Setup =====
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('ERROR: Supabase credentials are missing in .env file');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ===== GET /api/projects - Fetch all projects =====
router.get('/', async (req, res) => {
    try {
        // Query Supabase projects table
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        // Handle Supabase errors
        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ 
                error: 'Failed to fetch projects',
                details: error.message 
            });
        }

        // Return projects
        return res.json(data || []);

    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
});

// ===== GET /api/projects/:id - Fetch a single project =====
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Query Supabase for specific project
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();

        // Handle not found
        if (error || !data) {
            return res.status(404).json({ 
                error: 'Project not found' 
            });
        }

        // Return project
        return res.json(data);

    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
});

module.exports = router;
