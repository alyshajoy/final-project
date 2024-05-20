import React from "react";
import ListContainer from "../components/Tasks/ListContainer";
import TimerSettingsContextProvider from "../contexts/TimerSettingsContext";
import HomeButton from '../components/buttons/HomeButton';

const Tasks = () => {
  return (
    <div>
      
      <div>
        <TimerSettingsContextProvider>
        <HomeButton />
        <ListContainer/>
        </TimerSettingsContextProvider>
      </div>
    </div>
  );
};

export default Tasks;