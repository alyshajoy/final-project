import React from "react";
import { useState } from "react";
import RemoveTask from "./RemoveTask";
import Checkbox from "./Checkbox";
import '../../styles/CSS/ListItems.css';
import { ReactComponent as UpdateButton } from '../../assets/taskspage_icons/UpdateButton.svg';
import ListItemTimer from "./ListItemTimer";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ListItem = (props) => {

  const {
    value, 
    task,  
    handleAdd, 
    handleComplete, 
    handleDelete, 
    setTasks, 
    setValue, 
    handleUpdate, 
    complete, 
    setComplete,
    sortedTasks,
    checkedTasks,
    setCheckedTasks,
    id
  } = props;

  const {
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition
  } = useSortable({id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleEdit = (id) => {
    setEdit(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(edit) {
      handleUpdate(task.id, editValue); 
      setEdit(false); // Exiting edit mode
    }
  }


  return (
    <div className="list-item-container" style={style} {...attributes} {...listeners} ref={setNodeRef}>
      <div><Checkbox handleComplete={handleComplete} id={task.id} task={task} checkedTasks={checkedTasks} setCheckedTasks={setCheckedTasks}/></div>
      {edit 
      ? <div className="edit-form-div-container">
          <form onSubmit={handleSubmit} className="edit-form-container">
            <input 
            value={editValue}
            autoFocus 
            onBlur={handleSubmit}
            onChange={e => setEditValue(e.target.value)}
            />
            <button type="submit" onClick={handleSubmit}><UpdateButton className="update-button"/></button>
          </form>
        </div>
      : <div 
          className={task.completed?"list-item-title-strike":"list-item-title"} 
          onClick={() => handleEdit(task.id)}> 
          {task.title} 
        </div>
      }
      <div><ListItemTimer title={task.title}/></div>
      <div className="remove-task"><RemoveTask handleDelete={handleDelete} id={task.id}/></div>
      
     
    </div>
  );
};

export default ListItem;