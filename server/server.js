const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/api', (req, res) => {
    res.json({ message: "Welcome to A Dog's Tale API!" });
});

// Start server
app.listen(PORT, () => {
    console.log('JWT_SECRET loaded:', !!process.env.JWT_SECRET);
    console.log(`Server running on http://localhost:${PORT}`);
});