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
//Post - Add
router.post('/', (req,res) => {
console.log('req.body', req.body);

const newTask = req.body.task;

  // (1, 'Finish Project', 'Complete the final touches on the project.', 1, '2024-05-10', 'false', NOW(), NOW()),
  db.query(`
  INSERT INTO tasks(user_id, title, description, priority, due_date, completed) 
  VALUES($1, $2, $3, $4, $5, $6)
  RETURNING *;
  `,[newTask.user_id, newTask.title, newTask.description, newTask.priority, newTask.due_date, newTask.completed])
  .then((result) => {
    res.status(201).json(result.rows);
  })
  .catch((error) => {
    return error;
  });

})

//Delete Route
router.delete('/:id/delete', (req, res) => {
  const id = req.params.id;
  db.query(
    `
    DELETE FROM tasks
    WHERE id = $1
    RETURNING *;
    `,[id]
  )
  .then((result) => {
      res.json(result.rows);
  })
  .catch((error) => {
    return error;
  });
  
})


//Edit completed route
router.patch('/:id/completed', (req, res) => {
  const completed = req.body.completed;
  const id = req.params.id;

  db.query(
    `
    UPDATE tasks
    SET completed = $1
    WHERE id = $2
    RETURNING *;
    `
    ,[completed, id]
  )
  .then((result) => {
    res.json(result.rows[0]); // Return the updated task
  })
  .catch((error) => {
    return error;
  });

})

//Edit title route
router.patch('/:id/edit', (req, res) => {
  const { title } = req.body;
  const id = req.params.id;

  db.query(
    `
    UPDATE tasks
    SET title = $1
    WHERE id = $2
    RETURNING*;
    `
    ,[title, id]
  )
  .then((result) => {
    res.json(result.rows[0]);
  })
  .catch((error) => {
    return error;
  });

})


module.exports = router;