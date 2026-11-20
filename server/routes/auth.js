const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/database');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required.'
            });
        }

        // Check if email already exists
        const [existingUsers] = await db.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                message: 'An account with this email already exists.'
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Insert user into database
        const [result] = await db.execute(
            'INSERT INTO users (email, password_hash) VALUES (?, ?)',
            [email, passwordHash]
        );

        res.status(201).json({
            message: 'Account created successfully!',
            user: {
                id: result.insertId,
                email: email
            }
        });

    } catch (error) {
        console.error('Registration error:', error);

        res.status(500).json({
            message: 'Something went wrong during registration.'
        });
    }
});

module.exports = router;

// Log in an existing user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required.'
            });
        }

        // Find user by email
        const [users] = await db.execute(
            'SELECT id, email, password_hash FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        const user = users[0];

        // Compare submitted password with stored hash
        const passwordMatches = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatches) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        // Generate authentication token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful!',
            token: token,
            user: {
                id: user.id,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);

        res.status(500).json({
            message: 'Something went wrong during login.'
        });
    }
});