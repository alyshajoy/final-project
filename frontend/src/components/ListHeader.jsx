import React from "react";
import '../styles/CSS/ListContainer.css'
import { ReactComponent as TodoIcon } from '../assets/TodoIcon.svg';

const ListHeader = (props) => {
  
  const {sort, setSort, toggleSort} = props;

  return (
    <div className="header-container">
      
      <h1 className="list-title">To Do List </h1>
      <TodoIcon className="todo-icon"/> 
      <button onClick={toggleSort}>Sort</button>
    </div>
  );
};

export default ListHeader;