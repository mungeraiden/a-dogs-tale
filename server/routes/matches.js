const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

// Temporary in-memory match and conversation data
const matches = [
    {
        id: 1,
        dogId: 2,
        name: 'Buddy',
        breed: 'Labrador',
        messages: [
            {
                sender: 'Buddy',
                text: 'Hey! Nice to meet you!',
                sentAt: new Date()
            }
        ]
    }
];

// Retrieve all matches and their conversations
router.get('/', authenticateToken, (req, res) => {
    const results = matches.map(match => ({
        id: match.id,
        dogId: match.dogId,
        name: match.name,
        breed: match.breed,
        messages: match.messages
    }));

    res.json(results);
});

// Retrieve messages for a specific match
router.get('/:matchId/messages', authenticateToken, (req, res) => {
    const match = matches.find(m => m.id === Number(req.params.matchId));

    if (!match) {
        return res.status(404).json({ message: 'Match not found.' });
    }

    res.json(match.messages);
});

// Send and store a message
router.post('/:matchId/messages', authenticateToken, (req, res) => {
    const match = matches.find(m => m.id === Number(req.params.matchId));
    const { text } = req.body;

    if (!match) {
        return res.status(404).json({ message: 'Match not found.' });
    }

    if (!text || !text.trim()) {
        return res.status(400).json({ message: 'Message cannot be empty.' });
    }

    const message = {
        sender: 'You',
        text: text.trim(),
        sentAt: new Date()
    };

    match.messages.push(message);

    res.status(201).json({
        message: 'Message sent successfully!',
        sentMessage: message
    });
});

module.exports = router;