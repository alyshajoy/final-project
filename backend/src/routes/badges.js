const express = require('express');
const db = require('../db/connection'); // Assuming you have a db module for database connection

const router = express.Router();

//Prefix '/api/badges' for endpoint

// Badges Routes
router.get('/', async (req, res) => {
  const user_id = 1;  // Assuming you are storing user_id in cookies

  try {
      const result = await db.query(`
        SELECT badges.*, user_badges.status 
        FROM badges 
        INNER JOIN user_badges ON badges.id = user_badges.badge_id 
        WHERE user_badges.user_id = $1
      `, [user_id]);
      res.json(result.rows);
  } catch (error) {
      console.error('Error fetching badges:', error);
      res.status(500).send({ message: 'Error fetching badges' });
  }
});

module.exports = router;
