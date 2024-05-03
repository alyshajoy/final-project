import React from "react";
import ListHeader from "./ListHeader";
import ListFooter from "./ListFooter";

const ListContainer = () => {
  return (
    <>
      <div>
        <ListHeader />
      </div>
      
      <div>
        <ListFooter />
      </div>
    </>
  );
};

export default ListContainer;