const express = require('express');
const db = require('../db/connection'); // Assuming you have a db module for database connection

const router = express.Router();

//Prefix '/api/calendar' for endpoint

let events = ['test'];

// Calendar Routes
router.get('/', (req, res) => {
  res.send('Hello Calendar Api')
});

// Receive calendar event form
router.post('/events', (req, res) => {
  const { title, date, startTime, endTime } = req.body;
  const newEvent = {
      id: events.length + 1, // Simple ID generation
      title,
      date,
      startTime,
      endTime
  };
  events.push(newEvent); // You would replace this with a database insert operation
  res.status(201).send(newEvent);
});

module.exports = router;