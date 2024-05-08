import React from "react";

const Checkbox = (props) => {
  return (
    <>
      <input type="checkbox" onClick={() => props.handleComplete(props.task_id)}/>
    </>
  )
};

export default Checkbox;