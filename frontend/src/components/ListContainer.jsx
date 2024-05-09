import React from "react";
import { useState, useEffect } from "react";
import ListHeader from "./ListHeader";
import ListFooter from "./ListFooter";
import ListItems from "./ListItems";

const ListContainer = () => {

  useEffect (() => {
    fetch('/api/tasks')
    .then((res) => res.json())
    .then((data) => {
      setTasks(data);
    })
    .catch((error) => {
      console.error('Error fetching tasks:', error);
    });
  }, []);

  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [complete, setComplete] = useState([]);

  const handleAdd = () => {
    
    const copy = [...tasks, {title: value, task_id: tasks.length + 1, completed: false}];
    setTasks(copy);
    setValue("");
  }

  const handleDelete = (task_id) => {
    console.log('Delete');
    const filteredTasks = tasks.filter((task) => {
      return task.task_id !== task_id
    })
    setTasks(filteredTasks);
  }

  const handleComplete = (task_id) => {
    const completedTasks = tasks.filter((task) => {
      return task.task_id !== task_id
    })
    setComplete(completedTasks);
  }

  const items = [
    {id: 1, title:'Banana'}, 
    {id: 2,title:'Chocolate'}, 
    {id: 3,title:'Strawberry'}
  ];

  return (
    <>
      <div>
        <ListHeader />
      </div>
      <form>
        <input value={value} onChange={e => setValue(e.target.value)}/>
        <button type="button" onClick={handleAdd}>Add</button>
      </form>
      <div>
        <ListItems 
        handleDelete={handleDelete} 
        tasks={tasks} 
        value={value} 
        complete={complete}
        setComplete={complete}
        setValue={setValue} 
        setTasks={setTasks}
        handleAdd={handleAdd}
        handleComplete={handleComplete}
        />
        
      </div>
      <div>
        <ListFooter />
      </div>
    </>
  );
};

export default ListContainer;