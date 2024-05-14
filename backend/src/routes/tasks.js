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
    completed: false,
    priority: 2
  },
  {
    task_id: 4,
    title: "Write draft for email",
    completed: false,
    priority: 3
  },
  {
    task_id: 5,
    title: "Read Chapter 1",
    completed: false,
    priority: 1
  },
]

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
router.post('/', (req,res) => {
console.log('req.body', req.body);
const title = req.body.title;
  const newTask = {
    user_id: 1,
    title: title,
    description: 'blank',
    priority: 0,
    due_date: '2024-05-10',
    completed: false,
    
  }
  // (1, 'Finish Project', 'Complete the final touches on the project.', 1, '2024-05-10', 'false', NOW(), NOW()),
  db.query(`
  INSERT INTO tasks(user_id, title, description, priority, due_date, completed) 
  VALUES($1, $2, $3, $4, $5, $6)
  RETURNING *;
  `,[newTask.user_id, newTask.title, newTask.description, newTask.priority, newTask.due_date, newTask.completed])
  .then((taskEntry) => {
    res.status(201).json(taskEntry);
  })

  

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

module.exports = router;