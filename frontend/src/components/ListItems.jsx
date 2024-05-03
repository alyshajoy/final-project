import React from "react";
import ListItem from "./ListItem";

const ListItems = (props) => {


  const mappedList = (items) => {
    return items.map(item => (
      <ListItem 
        item={item}
        
      />
    ));
  };

  return (
    <div>
      <ul>
        {mappedList(props.items)}
      </ul>
    </div>
  );
};

export default ListItems;