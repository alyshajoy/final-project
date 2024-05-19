const express = require('express');
const db = require('../db/connection'); // Assuming you have a db module for database connection

const router = express.Router();

//Prefix '/api/tasks' for endpoint

// const tasks = [
//   {
//     task_id: 1,
//     title: "Finish Project",
//     completed: false,
//     priority: 1
//   },
//   {
//     task_id: 2,
//     title: "Start Blog Post",
//     completed: false,
//     priority: 3
//   },
//   {
//     task_id: 3,
//     title: "Update Resume",
//     completed: false,
//     priority: 2
//   },
//   {
//     task_id: 4,
//     title: "Write draft for email",
//     completed: false,
//     priority: 3
//   },
//   {
//     task_id: 5,
//     title: "Read Chapter 1",
//     completed: false,
//     priority: 1
//   },
// ]

// Tasks Routes

//Get 
router.get('/', (req, res) => {
  db.query(`SELECT * FROM tasks`)
  .then(({rows}) => {
      res.json(rows);
    });
  // res.status(200).json(tasks);
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
    console.log('result.rows', result.rows)
    res.status(201).json(result.rows);
  })
  .catch((error) => {
    return error;
  });
  //Post route with mock data
  // const newTask = {
  //   id: tasks.length + 1,
  //   title: req.body.title,
  //   completed: false,
  //   priority: 0
  // }
  // tasks.push(newTask);
  // res.status(201).json(tasks);

})

//Delete Route
router.delete('/:id/delete', (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  console.log('req.params.id', id);
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
  console.log('req.body', req.body);
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