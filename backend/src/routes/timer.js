const express = require('express');
const db = require('../db/connection'); // Assuming you have a db module for database connection

const router = express.Router();

//Prefix '/api/timer' for endpoint

// Timer Routes

// Get all usernames with timer columns
router.get('/', (req, res) => {
  db.query(`SELECT username, timer_active, timer_minutes FROM users`)
  .then(({rows}) => {
    res.json(rows);
  });
});

// Get one user
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.query(`
  SELECT username, timer_active, timer_minutes, timer_uses
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
router.put('/update/timer_minutes/:id', (req, res) => {

  const { id } = req.params;
  const { minutes_added } = req.body

  db.query(`
  UPDATE users
  SET timer_minutes = $1
  WHERE id = $2
  `, [minutes_added, id])
  .then(({rows}) => {
    res.json(`User ${id} has added ${minutes_added} minutes!`)
  })
});

// Update timer uses 
router.put('/update/timer_uses/:id', (req, res) => {

  const { id } = req.params;
  const { timer_used } = req.body

  db.query(`
  UPDATE users
  SET timer_minutes = $1
  WHERE id = $2
  `, [timer_used, id])
  .then(({rows}) => {
    res.json(`User ${id} has used the timer ${timer_used} times!`)
  })

});

module.exports = router;