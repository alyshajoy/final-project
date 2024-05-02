import React from "react";
import ListHeader from "./ListHeader";
import ListFooter from "./ListFooter";

const Main = () => {
  return (
    <>
      <div>
        <ListHeader />
      </div>
      <div>
        <h1>I am the Tasks page</h1>
      </div>
      <div>
        <ListFooter />
      </div>
    </>
  );
};

export default Main;