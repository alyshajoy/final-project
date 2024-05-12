const express = require('express');
const db = require('../db/connection'); // Assuming you have a db module for database connection

const router = express.Router();

//Prefix '/api/calendar' for endpoint

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

  const { title, date, start, end, allDay } = req.body;

  const queryText = `
    INSERT INTO calendar_events (
      user_id, title, date, start_time, end_time, all_day
    ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
  `;

  const queryParams = [
    user_id, title, date, start, end, allDay || false // Set all_day to false if not provided
  ];

  try {
    const result = await db.query(queryText, queryParams);
    res.status(201).send(result.rows[0]);
  } catch (error) {
    console.error('Error adding event to database:', error);
    res.status(400).send({ message: error.message });
  }
});

// Delete calendar event
router.delete('/events/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the event ID from the URL parameter
    const queryText = `
      DELETE FROM calendar_events
      WHERE id = $1;
    `;
    await db.query(queryText, [id]);
    res.status(200).send({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).send({ message: 'Failed to delete the event' });
  }
});

// Update Events
router.put('/api/calendar/events/:eventId', async (req, res) => {
  const eventId = req.params.eventId;
  const { title, date, start, end, allDay } = req.body;

  try {
    const queryText = `
      UPDATE calendar_events
      SET title = $1, date = $2, start_time = $3, end_time = $4, all_day = $5
      WHERE id = $6;
    `;
    const queryParams = [title, date, start, end, allDay, eventId]

    await db.query(queryText, queryParams);
      res.status(200).send({ message: 'Event updated successfully' }); // Changed message to indicate update
    } catch (error) {
      console.error('Update event error:', error); // Changed console message to indicate update error
      res.status(500).send({ message: 'Failed to update the event' });
    }
});

module.exports = router;