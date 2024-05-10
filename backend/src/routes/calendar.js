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
router.post('/events', async (req, res) => {

  const user_id = req.cookies.userId;

  const { title, date, startTime, endTime } = req.body;

  const start_time = `${date}T${startTime}:00`;
  const end_time = `${date}T${endTime}:00`;

  const queryText = `
    INSERT INTO calendar_events (
      user_id, title, date, start_time, end_time
    ) VALUES ($1, $2, $3, $4, $5) RETURNING *;
  `;

  const queryParams = [
    user_id, title, date, start_time, end_time
  ];

  try {
    const result = await db.query(queryText, queryParams);
    res.status(201).send(result.rows[0]);
  } catch (error) {
    console.error('Error adding event to database:', error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;