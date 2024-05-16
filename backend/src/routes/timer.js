const express = require('express');
const db = require('../db/connection'); // Assuming you have a db module for database connection

const router = express.Router();

//Prefix '/api/timer' for endpoint

// Timer Routes
router.get('/', (req, res) => {
  db.query(`SELECT username, timer_active, timer_minutes FROM users`)
  .then(({rows}) => {
    res.json(rows);
  });
});

module.exports = router;