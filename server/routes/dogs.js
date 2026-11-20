const express = require('express');
const db = require('../config/database');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Create a new dog profile
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { name, breed, age, location, bio, photo_url } = req.body;

        // Validate required input
        if (!name) {
            return res.status(400).json({
                message: 'Dog name is required.'
            });
        }

        // Insert dog profile into database
        const [result] = await db.execute(
            'INSERT INTO dogs (user_id, name, breed, age, location, bio, photo_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [req.userId, name, breed || null, age ?? null, location || null, bio || null, photo_url || null]
        );

        res.status(201).json({
            message: 'Dog profile created successfully!',
            dog: {
                id: result.insertId,
                user_id: req.userId,
                name,
                breed,
                age,
                location,
                bio,
                photo_url
            }
        });

    } catch (error) {
        console.error('Dog creation error:', error);

        res.status(500).json({
            message: 'Something went wrong while creating the dog profile.'
        });
    }
});

// Get all dog profiles
// Get all dog profiles with optional filters
router.get('/', authenticateToken, async (req, res) => {
    try {
        const { breed, age, location } = req.query;

        let query = `
            SELECT id, user_id, name, breed, age, location, bio, photo_url, created_at
            FROM dogs
            WHERE 1 = 1
        `;

        const params = [];

        // Filter by breed
        if (breed) {
            query += ' AND breed LIKE ?';
            params.push(`%${breed}%`);
        }

        // Filter by location
        if (location) {
            query += ' AND location LIKE ?';
            params.push(`%${location}%`);
        }

        // Filter by age
        if (age !== undefined) {
            const parsedAge = Number(age);

            if (!Number.isInteger(parsedAge) || parsedAge < 0) {
                return res.status(400).json({
                    message: 'Age must be a valid non-negative number.'
                });
            }

            query += ' AND age = ?';
            params.push(parsedAge);
        }

        query += ' ORDER BY created_at DESC';

        const [dogs] = await db.execute(query, params);

        res.json({
            message: 'Dog profiles retrieved successfully!',
            dogs: dogs
        });

    } catch (error) {
        console.error('Dog retrieval error:', error);

        res.status(500).json({
            message: 'Something went wrong while retrieving dog profiles.'
        });
    }
});

// Get a specific dog profile
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const [dogs] = await db.execute(
            'SELECT id, user_id, name, breed, age, bio, photo_url, created_at FROM dogs WHERE id = ?',
            [id]
        );

        if (dogs.length === 0) {
            return res.status(404).json({
                message: 'Dog profile not found.'
            });
        }

        res.json({
            message: 'Dog profile retrieved successfully!',
            dog: dogs[0]
        });

    } catch (error) {
        console.error('Dog retrieval error:', error);

        res.status(500).json({
            message: 'Something went wrong while retrieving the dog profile.'
        });
    }
});

module.exports = router;