const express = require('express');
const db = require('../db/connection'); // Assuming you have a db module for database connection

const router = express.Router();

// Tasks Route
router.get('/', (req, res) => {
  db.query(`SELECT * FROM tasks`)
  .then(({rows}) => {
      res.json(rows);
    });
});

module.exports = router;