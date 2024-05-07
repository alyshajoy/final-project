import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCoffee, faMinus, faTrash } from '@fortawesome/fontawesome-free-solid'

const RemoveTask = (props) => {
  return (
    <>
      <FontAwesomeIcon icon={faTrash} onClick={() => props.handleDelete(props.task_id)}/>
    </>
  )
};

export default RemoveTask;