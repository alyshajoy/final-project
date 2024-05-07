// Environment variables
require('dotenv').config({ path: '../../.env'});


// Modules
const express = require('express');
const db = require('./db/connection'); // Assuming you have a db module for database connection

// Require/import Feature Routes
const tasksRoutes = require('./routes/tasks');
const timerRoutes = require('./routes/timer');
const calendarRoutes = require('./routes/calendar');
const badgesRoutes = require('./routes/badges');

// Initialize Express
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define endpoints
app.use('/api/tasks', tasksRoutes)
app.use('/api/timer', timerRoutes)
app.use('/api/calendar', calendarRoutes)
app.use('/api/badges', badgesRoutes)

// Index Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

  