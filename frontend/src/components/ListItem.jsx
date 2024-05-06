import React from "react";
import Checkbox from "./buttons/Checkbox";
import '../styles/ListItems.scss';
import RemoveTask from "./buttons/RemoveTask";

const ListItem = (props) => {
  return (
    <div className="list-item-container">
      <div><Checkbox/></div>
      <h3 className="list-item-title"> {props.item.title}</h3>
      <div><RemoveTask/></div>
      
    </div>
  );
};

export default ListItem;