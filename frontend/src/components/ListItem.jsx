import React from "react";
import { useState } from "react";
import RemoveTask from "./buttons/RemoveTask";
import Checkbox from "./buttons/Checkbox";
import '../styles/CSS/ListItems.css';

const ListItem = (props) => {

  const {value, task, key, handleAdd, handleComplete, handleDelete, setTasks, setValue} = props;

  const [edit, setEdit] = useState(false);
  

  const handleEdit = (id) => {
    setEdit(true);
  }

  const handleSubmit = (e) => {
    console.log('submitted')
    e.preventDefault();
    props.handleAdd();
  }

 

  return (
    <div className="list-item-container">
      <div><Checkbox handleComplete={handleComplete} task_id={task.task_id}/></div>
      {edit 
     ? <div>
        <form>
          <input 
          type="text" 
          placeholder={task.title} 
          autoFocus 
          onBlur={() => setEdit(false)}
          onChange={e => setValue(e.target.value)}
          />
          <button type="submit" onClick={handleAdd}>Add</button>
        </form>
      </div>
      :<h3 className="list-item-title" onClick={() => handleEdit(task.task_id)}> {task.title} </h3>
      }
      
      <div><RemoveTask handleDelete={handleDelete} task_id={task.task_id}/></div>
      
     
    </div>
  );
};

export default ListItem;