import React from "react";
import ListHeader from "./ListHeader";
import ListFooter from "./ListFooter";
import ListItems from "./ListItems";

const ListContainer = () => {

  const items = ['Banana', 'Chocolate', 'Strawberry'];

  return (
    <>
      <div>
        <ListHeader />
      </div>
      <div>
        <ListItems items={items}/>
      </div>
      <div>
        <ListFooter />
      </div>
    </>
  );
};

export default ListContainer;