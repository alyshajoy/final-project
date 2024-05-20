const express = require('express');
const db = require('../db/connection'); // Assuming you have a db module for database connection

const router = express.Router();

//Prefix '/api/timer' for endpoint

// Timer Routes

// Get all usernames with timer columns
router.get('/', (req, res) => {
  db.query(`SELECT id, username, timer_active, timer_minutes, timer_uses FROM users`)
  .then(({rows}) => {
    res.json(rows);
  });
});

// Get one user
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.query(`
  SELECT id, username, timer_active, timer_minutes, timer_uses
  FROM users
  WHERE id = $1
  `, [id])
  .then(({rows}) => {
    res.json(rows);
  })
})

// Update timer active to true
router.put('/update/timer_status/:id', (req, res) => {
  
  const { id } = req.params;

  db.query(`
    UPDATE users
    SET timer_active = true
    WHERE id = $1
  `, [id])
  .then(({rows}) => {
    res.json(`User ${id} has Timer Active set to true!`)
  })

});

// Update timer minutes
router.put('/update/timer_minutes/:id', async(req, res) => {

  const { id } = req.params;
  const { timer_minutes } = req.body;
  console.log('minutes added: ', timer_minutes);

  if (typeof timer_minutes !== 'number') {
    console.error('Invalid input: ', req.body);
    return res.status(400).json({ error: 'Invalid Input'});
  }

  try {
    const result = await db.query(`
    UPDATE users
    SET timer_minutes = $1
    WHERE id = $2
    RETURNING *
    `, [timer_minutes, id])
    console.log('Database update result: ', result.rows);
    res.status(200).json({ success: true, result: result.rows })
  } catch (err) {
    console.error('Database update failed: ', err.message)
    res.status(500).json({ error: 'Database update failed' });
  }
});

// Update timer uses 
router.put('/update/timer_uses/:id', async(req, res) => {

  const { id } = req.params;
  const { timer_uses } = req.body;
  console.log('timer count: ', timer_uses);

  if (typeof timer_uses !== 'number') {
    console.error('Invalid input: ', req.body);
    return res.status(400).json({ error: 'Invalid Input'});
  }

  try {
    const result = await db.query(`
    UPDATE users
    SET timer_uses = $1
    WHERE id = $2
    RETURNING *
    `, [timer_uses, id])
    console.log('Database update result: ', result.rows);
    res.status(200).json({ success: true, result: result.rows })
  } catch (err) {
    console.error('Database update failed: ', err.message)
    res.status(500).json({ error: 'Database update failed' });
  }

});

module.exports = router;