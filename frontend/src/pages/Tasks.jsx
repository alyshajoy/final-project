import React from "react";
import ListContainer from "../components/ListContainer";
import HomeButton from '../components/buttons/HomeButton';

const Tasks = () => {
  return (
    <div>
      <HomeButton />
      <div>
        <ListContainer/>
      </div>
    </div>
  );
};

export default Tasks;