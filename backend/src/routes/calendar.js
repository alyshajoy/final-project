const express = require('express');
const db = require('../db/connection'); // Assuming you have a db module for database connection

const router = express.Router();

//Prefix '/api/calendar' for endpoint

// Calendar Routes
router.get('/', (req, res) => {
  res.send('Hello Calendar Api')
});

module.exports = router;