import React from "react";
import ListItem from "./ListItem";

const ListItems = (props) => {


  const mappedList = (todos) => {
    return todos.map(todo => (
      <ListItem 
        // item={item}
        // key={item.id}
        todo={todo}
        key={todo}
        handleDelete={props.handleDelete}
        
      />
    ));
  };

  return (
    <div className="list-items-container">
      <ul className="list-items-container-inner">
        {mappedList(props.todo)}
      </ul>
    </div>
  );
};

export default ListItems;