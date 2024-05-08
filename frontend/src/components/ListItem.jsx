import React from "react";
import { useState } from "react";
import RemoveTask from "./buttons/RemoveTask";
import Checkbox from "./buttons/Checkbox";
import '../styles/CSS/ListItems.css';

const ListItem = (props) => {

  // const handleDelete = (id) => {
  //   console.log('Deleted!')
  // }

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
      <div><Checkbox handleComplete={props.handleComplete} task_id={props.task.task_id}/></div>
      {edit 
     ? <div>
        <form>
          <input 
          type="text" 
          placeholder={props.task.title} 
          autoFocus 
          onBlur={() => setEdit(false)}
          onChange={e => props.setValue(e.target.value)}
          onSubmit={e => e.preventDefault()}
          />
        </form>
      </div>
      :<h3 className="list-item-title" onClick={() => handleEdit(props.task.task_id)}> {props.task.title} </h3>
      }
      
      <div><RemoveTask handleDelete={props.handleDelete} task_id={props.task.task_id}/></div>
      
     
    </div>
  );
};

export default ListItem;