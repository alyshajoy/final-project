import React from "react";
import Checkbox from "./buttons/Checkbox";
import '../styles/ListItems.scss';
import RemoveTask from "./buttons/RemoveTask";

const ListItem = (props) => {

  // const handleDelete = (id) => {
  //   console.log('Deleted!')
  // }

  return (
    <div className="list-item-container">
      <div><Checkbox/></div>
      <h3 className="list-item-title"> {props.task.title}</h3>
      <div><RemoveTask handleDelete={props.handleDelete}/></div>
      
    </div>
  );
};

export default ListItem;