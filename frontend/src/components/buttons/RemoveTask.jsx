import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCoffee, faMinus, faTrash } from '@fortawesome/fontawesome-free-solid'

const RemoveTask = (props) => {

  const {task_id, handleDelete} = props;

  return (
    <>
      <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(task_id)}/>
    </>
  )
};

export default RemoveTask;