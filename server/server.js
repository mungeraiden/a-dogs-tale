const express = require('express');
const dotenv = require('dotenv');
const authenticateToken = require('./middleware/auth');
const dogsRoutes = require('./routes/dogs');
const interactionsRoutes = require('./routes/interactions');
const matchesRoutes = require('./routes/matches');
const path = require('path');

dotenv.config();

const authRoutes = require('./routes/auth');

const app = express();
app.use(express.static('public'));
app.use(express.static('..'));
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/dogs', dogsRoutes);
app.use('/api/interactions', interactionsRoutes);
app.use('/api/matches', matchesRoutes);
app.use(express.static(path.join(__dirname, '..')));

// Routes
app.use('/api/auth', authRoutes);

// Protected test route
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({
        message: 'You are authenticated!',
        userId: req.userId
    });
});

// Test route
app.get('/api', (req, res) => {
    res.json({ message: "Welcome to A Dog's Tale API!" });
});

// Start server
app.listen(PORT, () => {
    console.log('JWT_SECRET loaded:', !!process.env.JWT_SECRET);
    console.log(`Server running on http://localhost:${PORT}`);
});