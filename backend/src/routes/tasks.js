const express = require('express');
const db = require('../db/connection'); // Assuming you have a db module for database connection

const router = express.Router();

//Prefix '/api/tasks' for endpoint

const tasks = [
  {
    task_id: 1,
    title: "Finish Project",
    status: false,
  },
  {
    task_id: 2,
    title: "Start Blog Post",
    status: false,
  },
  {
    task_id: 3,
    title: "Update Resume",
    status: true,
  },
]

// Tasks Routes

//Get 
router.get('/', (req, res) => {
  // db.query(`SELECT * FROM tasks`)
  // .then(({rows}) => {
  //     res.json(rows);
  //   });
  res.status(200).json(tasks);
});

//Post
router.post('/', (req,res) => {
  // db.query(`
  // INSERT INTO tasks(task_id, user_id, title, description, priority, due_date, status) 
  // VALUES($1, $2, $3, $4, $5, $6, $7)
  // RETURNING *;
  // `,[id, user_id, title, description, priority, due_date, status])
  // .then((taskEntry) => {
  //   console.log(taskEntry);
  // })



  const newTask = {
    task_id: tasks.length + 1,
    title: req.body.title
  }
  tasks.push(newTask);
  res.status(201).json(tasks);

})

module.exports = router;