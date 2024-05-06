import React from "react";
import ListItem from "./ListItem";

const ListItems = (props) => {


  const mappedList = (items) => {
    return items.map(item => (
      <ListItem 
        item={item}
        key={item.id}
      />
    ));
  };

  return (
    <div className="list-items-container">
      <ul className="list-items-container-inner">
        {mappedList(props.items)}
      </ul>
    </div>
  );
};

export default ListItems;