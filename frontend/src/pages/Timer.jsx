import React from "react";
import FocusTimer from '../components/timer/FocusTimer'
import TimerSettingsContextProvider from "../contexts/TimerSettingsContext";
import HomeButton from "../components/buttons/HomeButton";

const Timer = () => {
  return (
    <div>
      <main>
        <TimerSettingsContextProvider>
          <HomeButton />
          <FocusTimer />
        </TimerSettingsContextProvider>
      </main>
    </div>
  );
};

export default Timer;