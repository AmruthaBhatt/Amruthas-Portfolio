// /api/contact.js - Vercel Serverless Function
// This handles POST /api/contact requests

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
    res.setHeader('Content-Type', 'application/json');
};

// Validation function
function validateContactData(data) {
    const errors = [];

    // Validate name
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
        errors.push('Name is required and must be a non-empty string');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Valid email is required');
    }

    // Validate message
    if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
        errors.push('Message is required and must be a non-empty string');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

module.exports = async (req, res) => {
    // Set CORS headers
    setCorsHeaders(res);

    // Handle OPTIONS requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        if (req.method === 'POST') {
            // Submit contact message
            const { name, email, message } = req.body;

            // Validate input data
            const validation = validateContactData({ name, email, message });

            if (!validation.isValid) {
                return res.status(400).json({
                    error: 'Validation failed',
                    details: validation.errors
                });
            }

            // Insert contact message into Supabase
            const { data, error } = await supabase
                .from('contacts')
                .insert([
                    {
                        name: name.trim(),
                        email: email.trim(),
                        message: message.trim()
                    }
                ])
                .select();

            // Handle Supabase insert errors
            if (error) {
                console.error('Supabase error:', error);
                return res.status(500).json({
                    error: 'Failed to save contact message',
                    details: error.message
                });
            }

            // Success response
            console.log(`✅ New contact message from ${email}: ${name}`);
            return res.status(201).json({
                message: 'Contact message received successfully',
                data: data[0]
            });

        } else if (req.method === 'GET') {
            // Get all contact messages (admin endpoint)
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Supabase error:', error);
                return res.status(500).json({
                    error: 'Failed to fetch contacts',
                    details: error.message
                });
            }

            return res.status(200).json(data || []);

        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
};
