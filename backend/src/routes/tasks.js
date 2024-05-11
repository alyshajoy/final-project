const express = require('express');
const db = require('../db/connection'); // Assuming you have a db module for database connection

const router = express.Router();

//Prefix '/api/tasks' for endpoint

const tasks = [
  {
    task_id: 1,
    title: "Finish Project",
    completed: false,
    priority: 1
  },
  {
    task_id: 2,
    title: "Start Blog Post",
    completed: false,
    priority: 3
  },
  {
    task_id: 3,
    title: "Update Resume",
    completed: true,
    priority: 2
  },
  {
    task_id: 4,
    title: "Write draft for email",
    completed: true,
    priority: 3
  },
  {
    task_id: 5,
    title: "Read Chapter 1 and take notes",
    completed: true,
    priority: 1
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
    title: req.body.title,
    completed: false,
    priority: 0
  }
  tasks.push(newTask);
  res.status(201).json(tasks);

})

module.exports = router;