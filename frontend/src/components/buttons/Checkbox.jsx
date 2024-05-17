import React from "react";
import '../../styles/CSS/Checkbox.css';

const Checkbox = (props) => {

  const {id, handleComplete} = props;

  return (
    <label className="checkbox-container">
      <input type="checkbox" className="checkbox" onClick={() => handleComplete(id)}/>
      <span className="checkmark"></span>
    </label>
  )
};

export default Checkbox;