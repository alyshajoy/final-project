const express = require('express');
const db = require('../db/connection'); // Assuming you have a db module for database connection

const router = express.Router();

//Prefix '/api/badges' for endpoint

// Badges Routes
router.get('/', (req, res) => {
  res.send('Hello Badges Api')
});

module.exports = router;