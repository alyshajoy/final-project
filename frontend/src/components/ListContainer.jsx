import React from "react";
import { useState, useEffect } from "react";
import ListHeader from "./ListHeader";
import ListFooter from "./ListFooter";
import ListItems from "./ListItems";
// import addButton from '../assets/addButton.svg';
import { ReactComponent as AddButton } from '../assets/addButton.svg';

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
  const [sort, setSort] = useState(false);

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

  // const handleComplete = (task_id) => {
  //   const completedTasks = tasks.filter((task) => {
  //     return task.task_id !== task_id
  //   })
  //   setComplete(completedTasks);
  // }

  const handleComplete = (task_id) => {
    const updatedTasks = tasks.map(task => {
      if (task.task_id === task_id) {
        // Toggle the completed status of the task
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleUpdate = (taskId, newTitle) => {
    const updatedTasks = tasks.map(task => {
      if (task.task_id === taskId) {
        return { ...task, title: newTitle };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority);
  
  const toggleSort = () => {
    setSort(!sort);
  }

  return (
    <>
      <div>
        <ListHeader toggleSort={toggleSort} sort={sort} setSort={setSort}/>
      </div>
      <form className="add-form-container">
        <input value={value} onChange={e => setValue(e.target.value)}/>
        <button type="button" onClick={handleAdd}> 
          <AddButton className="add-button"/>
        </button>
      </form>
      <div>
        <ListItems 
        handleDelete={handleDelete} 
        tasks={tasks} 
        value={value} 
        complete={complete}
        setComplete={setComplete}
        setValue={setValue} 
        setTasks={setTasks}
        handleAdd={handleAdd}
        handleComplete={handleComplete}
        handleUpdate={handleUpdate}
        sortedTasks={sortedTasks}
        sort={sort}
        />
        
      </div>
      <div>
        <ListFooter />
      </div>
    </>
  );
};

export default ListContainer;