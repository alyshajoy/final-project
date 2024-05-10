const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.post('/register', async (req, res) => {

  const { firstName, lastName } = req.body;
  const hardcodedEmail = 'example@example.com';
  const hardcodedPassword = 'password1234';
  const hardcodedUsername = "defaultUsername";

    try {
        const response = await pool.query(
            'INSERT INTO users (first_name, last_name, email, password_hash, username) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email, username;',
            [firstName, lastName, hardcodedEmail, hardcodedPassword, hardcodedUsername]
        );

        const userId = response.rows[0].id;

        console.log('Setting cookie for user ID:', userId);
        // Set a cookie with the user's ID or a session token
        res.cookie('userId', userId, { maxAge: 86400000 });
        console.log('Cookie set:', res.get('Set-Cookie'));

        res.status(201).json(response.rows[0]);  // Send back the newly created user
    } catch (error) {
        console.error('Error saving user to database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

});

module.exports = router;