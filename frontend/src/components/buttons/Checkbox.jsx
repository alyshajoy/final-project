import React from "react";

const Checkbox = (props) => {

  const {task_id, handleComplete} = props;

  return (
    <>
      <input type="checkbox" onClick={() => handleComplete(task_id)}/>
    </>
  )
};

export default Checkbox;