const express = require('express');
const app = express();
const PORT = 5000;
const path = require('path');

// Middleware to parse JSON
app.use(express.json());

// FIX 1: Point static middleware directly to the public folder
app.use(express.static(path.join(__dirname, 'public'))); 

// FIX 2: Explicitly serve the frontend homepage from inside the public folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Serve the history webpage explicitly
app.get('/history.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'history.html'));
});

// In-memory array to store user data logs
let database = []; 

// 1. POST Route: Save entries with validation
app.post('/api/mood', (req, res) => {
    const { moodScale, journalText } = req.body;
    const score = Number(moodScale);

    // Backend Validation Rule
    if (!moodScale || score < 1 || score > 10) {
        return res.status(400).json({ 
            success: false, 
            message: "Validation Failed: Mood score must be a number between 1 and 10." 
        });
    }

    const newEntry = { 
        moodScale: score, 
        journalText: journalText || "", 
        timestamp: new Date() 
    };

    database.push(newEntry);
    res.status(201).json({ success: true, entry: newEntry }); 
});

// 2. GET Route: Fetch data history
app.get('/api/mood', (req, res) => {
    res.json(database);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running successfully on http://localhost:${PORT}`);
});