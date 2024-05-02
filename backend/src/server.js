// Environment variables
require('dotenv').config({ path: '../.env'});


// Modules
const express = require('express');
const db = require('./db/connection'); // Assuming you have a db module for database connection


// Initialize Express
const app = express();

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Index Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Tasks Route
app.get('/tasks', (req, res) => {
  db.query(`SELECT * FROM tasks`)
  .then(({rows}) => {
      res.json(rows);
    });
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

  