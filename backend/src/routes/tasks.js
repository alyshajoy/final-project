const express = require('express');
const db = require('../db/connection'); // Assuming you have a db module for database connection

const router = express.Router();

//Prefix '/api/tasks' for endpoint

// Tasks Routes

//Get 
router.get('/', (req, res) => {
  db.query(`SELECT * FROM tasks`)
  .then(({rows}) => {
      res.json(rows);
    });
});

//Post
router.post('/', (req,res) => {
  db.query(`
  INSERT INTO tasks(task_id, user_id, title, description, priority, due_date, status) 
  VALUES($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;
  `,[id, user_id, title, description, priority, due_date, status])
  .then((taskEntry) => {
    console.log(taskEntry);
  })
})

module.exports = router;