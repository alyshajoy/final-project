import React from "react";
import ListContainer from "../components/Tasks/ListContainer";
import HomeButton from '../components/buttons/HomeButton';

const Tasks = () => {
  return (
    <div>
        <div>
        <HomeButton />
        <ListContainer/>
      </div>
    </div>
  );
};

export default Tasks;