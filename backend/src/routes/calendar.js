const express = require('express');
const db = require('../db/connection'); // Assuming you have a db module for database connection

const router = express.Router();

//Prefix '/api/calendar' for endpoint

let events = ['test'];

// Calendar Routes
router.get('/', (req, res) => {
  res.send('Hello Calendar Api')
});

// GET route to fetch user events
router.get('/events', async (req, res) => {
  const user_id = req.cookies.userId;  // Assuming you are storing user_id in cookies

  try {
      const result = await db.query('SELECT * FROM calendar_events WHERE user_id = $1', [user_id]);
      res.json(result.rows);
  } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).send({ message: 'Error fetching events' });
  }
});

// Receive calendar event form
router.post('/events', async (req, res) => {

  const user_id = req.cookies.userId;

  const { title, date, start_time, end_time } = req.body;

  // const startTime = `${date}T${start_time}:00`;
  // const endTime = `${date}T${end_time}:00`;

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