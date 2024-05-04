import React from "react";
import Checkbox from "../pages/tasks/Checkbox";

const ListItem = (props) => {
  return (
    <div>
      
      <h3><Checkbox/> {props.item}</h3>
      <span></span>
    </div>
  );
};

export default ListItem;