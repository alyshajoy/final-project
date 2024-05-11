import React from "react";
import '../styles/CSS/ListContainer.css'

const ListHeader = (props) => {
  
  const {sort, setSort, toggleSort} = props;

  return (
    <div className="header-container">
      
      <h1 className="list-title">Things To Do</h1>
      <button onClick={toggleSort}>Sort</button>
    </div>
  );
};

export default ListHeader;