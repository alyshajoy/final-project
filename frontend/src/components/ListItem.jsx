import React from "react";
import Checkbox from "./buttons/Checkbox";
import '../styles/ListItems.scss';
import RemoveTask from "./buttons/RemoveTask";

const ListItem = (props) => {
  return (
    <div className="list-item-container">
      <span><Checkbox/></span>
      <h3 className="list-item-title"> {props.item}</h3>
      <span><RemoveTask/></span>
    </div>
  );
};

export default ListItem;