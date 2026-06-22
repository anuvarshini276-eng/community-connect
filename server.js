const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running beautifully at http://localhost:${PORT}`);
}); 
