const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();

// ===== Supabase Client Setup =====
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// ===== Validation Function =====
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

// ===== POST /api/contact - Submit contact form =====
router.post('/', async (req, res) => {
    try {
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

    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
});

// ===== GET /api/contact - Fetch all contact messages (optional, for admin) =====
router.get('/', async (req, res) => {
    try {
        // Note: In production, you'd want authentication for this endpoint

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

        return res.json(data || []);

    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
});

module.exports = router;
