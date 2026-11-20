const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

// Temporary in-memory data for WPD3
const likes = [];
const passes = [];
const matches = [];

// Simulated incoming likes for demonstrating mutual matches
const incomingLikes = [2];

router.post('/:dogId/like', authenticateToken, (req, res) => {
    const dogId = Number(req.params.dogId);

    if (!Number.isInteger(dogId) || dogId <= 0) {
        return res.status(400).json({ message: 'Invalid dog ID.' });
    }

    likes.push({ userId: req.userId, dogId });

    const isMatch = incomingLikes.includes(dogId);
    let match = null;

    if (isMatch) {
        match = {
            id: matches.length + 1,
            dogId,
            name: 'Buddy',
            breed: 'Labrador'
        };

        matches.push(match);
    }

    res.json({
        message: isMatch ? "It's a match!" : 'Like recorded!',
        matched: isMatch,
        match
    });
});

router.post('/:dogId/pass', authenticateToken, (req, res) => {
    const dogId = Number(req.params.dogId);

    if (!Number.isInteger(dogId) || dogId <= 0) {
        return res.status(400).json({ message: 'Invalid dog ID.' });
    }

    passes.push({ userId: req.userId, dogId });

    res.json({ message: 'Pass recorded!' });
});

module.exports = router;