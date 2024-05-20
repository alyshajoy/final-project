import React from "react";
import { useState, useEffect, useRef } from "react";
import ListHeader from "./ListHeader";
import ListFooter from "./ListFooter";
import Footer from "../components/home/Footer";
import ListItems from "./ListItems";
// import addButton from '../assets/addButton.svg';
import { ReactComponent as AddButton } from '../assets/addButton.svg';

const ListContainer = () => {

  useEffect (() => {
    fetch('/api/tasks')
    .then((res) => res.json())
    .then((data) => {
      setTasks(data);
      // Initialize checkedTasks based on completed status
      const initialCheckedTasks = data.reduce((acc, task) => {
        acc[task.id] = task.completed;
        return acc;
      }, {});
      setCheckedTasks(initialCheckedTasks);
    })
    .catch((error) => {
      console.error('Error fetching tasks:', error);
    });
  }, []);



  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [complete, setComplete] = useState([]);
  const [sort, setSort] = useState(false);
  const [add, setAdd] = useState(false);
  const addButtonClicked = useRef(false);
  // const [checked, setChecked] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState({});

  const handleAdd = () => {
    
  const newTask = {
    user_id: 1,
    title: value,
    description: 'blank',
    priority: 2,
    due_date: '2024-05-10',
    completed: false,
  }

  fetch("/api/tasks", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify({task:newTask})
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Failed to add task');
    }
    return res.json();
  })
  .then(data => {
    setTasks(prevTasks => [...prevTasks, data[0]]);
    setValue("");
    console.log('Task added successfully:', data[0]);
    handleAddMode();
  })
  .catch(error => {
    console.error('Error adding task:', error);
  });

  }

  const handleAddMode = () => {
    setAdd(!add);
  }

  const handleAddBlur = () => {
    setTimeout(() => {
      if (!addButtonClicked.current) {
        setAdd(false);
      }
    }, 150);
  };

  const handleDelete = (id) => {

    fetch(`/api/tasks/${id}/delete`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete task');
      }
      
    const filteredTasks = tasks.filter((task) => {
      console.log('task',task)
      return task.id !== id
    })
    setTasks(filteredTasks);
    })
    
    .catch(error => {
      console.error('Error deleting task:', error);
    });
    
  }

  // const handleBackendChecked = (data) => {
  //   const checkedTasks = data.map(task => task.completed);
  //     handleCheck
  // }

  // const handleCheck = ( id) => {
  //   const task = tasks.find(task => task.id === id);
  //   if(task.completed) {
  //     setChecked(!checked);
  //   }
    
  // }

  const handleComplete = (id) => {
    console.log('Tasks:', tasks); // Log current tasks
    const task = tasks.find(task => task.id === id);
  
    if (!task) {
      console.error(`Task with id ${id} not found`);
      return;
    }
    console.log('Task found:', task); // Log the found task
    const newStatus = !task.completed;
  
    fetch(`/api/tasks/${id}/completed`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ completed: newStatus }) // Ensure JSON body is sent
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to mark task as completed');
      }
      return res.json();
    })
    .then(updatedTask => {
      console.log('Completed task data:', updatedTask);
      
      const updatedTasksList = tasks.map(t => {
        if (t.id === id) {
          return updatedTask;
        }
        return t;
      });
      setTasks(updatedTasksList);
      setCheckedTasks(prevCheckedTasks => ({
        ...prevCheckedTasks,
        [id]: updatedTask.completed,
      }));
    })
    .catch(error => {
      console.error('Error completing task:', error);
    });
  };
  

  const handleUpdate = (id, newTitle) => {

    fetch(`/api/tasks/${id}/edit`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({title: newTitle})
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to edit task');
      }
      return res.json();
    })
    .then(updatedTask => {
      const updatedTasksList = tasks.map(t => {
        if (t.id === id) {
          return updatedTask;
        }
        return t;
      });
      setTasks(updatedTasksList);
    })
    .catch(error => {
      console.error('Error editing task:', error);
    });
    
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
      {add
      ?<form className="add-form-container">
      <input 
      value={value} 
      onChange={e => setValue(e.target.value)}
      autoFocus
      onBlur={handleAddBlur}
      />
      <button type="button" onClick={handleAdd}> 
        <AddButton className="add-button"/>
      </button>
    </form>
      :<form className="add-form-container">
     
      <button type="button" onClick={handleAddMode}> 
        <AddButton className="add-button"/>
      </button>
    </form>
      }
      
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
        checkedTasks={checkedTasks}
        setCheckedTasks={setCheckedTasks}
        // checked={checked}
        // setChecked={setChecked}
        // handleCheck={handleCheck}
        />
        
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ListContainer;