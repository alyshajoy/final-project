// Environment variables
require('dotenv').config({ path: '../.env'});


// Modules
const express = require('express');
const db = require('./db/connection'); // Assuming you have a db module for database connection


// Initialize Express
const app = express();


// Index Route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});