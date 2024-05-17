import React from "react";
import '../../styles/CSS/Checkbox.css';


const Checkbox = (props) => {

  const {id, handleComplete, checkedTasks, setCheckedTasks} = props;

  const onClick = () => {
    handleComplete(id);
    setCheckedTasks(prevCheckedTasks => ({
      ...prevCheckedTasks,
      [id]: !prevCheckedTasks[id],
    }));
  };

  return (
    <label className="checkbox-container">
      <input type="checkbox" className="checkbox" checked={checkedTasks[id]} onClick={onClick} />
      <span className="checkmark"></span>
    </label>
  )
};

export default Checkbox;