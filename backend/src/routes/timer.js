const express = require('express');
const db = require('../db/connection'); // Assuming you have a db module for database connection

const router = express.Router();

//Prefix '/api/timer' for endpoint

// Timer Routes
router.get('/', (req, res) => {
  res.send('Hello Timer Api');
});

module.exports = router;