import React from "react";
import Checkbox from "../pages/tasks/Checkbox";
import '../styles/ListItems.scss';

const ListItem = (props) => {
  return (
    <div className="list-item-container">
      <span><Checkbox/></span>
      <h3 className="list-item-title"> {props.item}</h3>
      
    </div>
  );
};

export default ListItem;