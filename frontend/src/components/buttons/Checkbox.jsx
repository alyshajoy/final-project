import React from "react";
import '../../styles/CSS/Checkbox.css';

const Checkbox = (props) => {

  const {task_id, handleComplete} = props;

  return (
    <label className="checkbox-container">
      <input type="checkbox" className="checkbox" onClick={() => handleComplete(task_id)}/>
      <span class="checkmark"></span>
    </label>
  )
};

export default Checkbox;