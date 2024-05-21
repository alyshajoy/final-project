import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';

const RemoveTask = (props) => {

  const {id, handleDelete} = props;

  return (
    <>
      <FontAwesomeIcon icon={faTrash}  onClick={() => handleDelete(id)}/>
    </>
  )
};

export default RemoveTask;