import React from "react";
import '../../styles/CSS/Checkbox.css';


const Checkbox = (props) => {

  const {id, handleComplete, checked, setChecked, handleCheck} = props;

const onClick = () => {
  handleComplete(id);
  handleCheck(id);
}

  return (
    <label className="checkbox-container">
      <input type="checkbox" className="checkbox" defaultChecked={checked} onClick={onClick} />
      <span className="checkmark"></span>
    </label>
  )
};

export default Checkbox;