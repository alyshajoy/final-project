import React from "react";
import FocusTimer from '../components/timer/FocusTimer'
import TimerSettingsContextProvider from "../context/TimerSettingsContext";

const Timer = () => {
  return (
    <div>
      <main>
        <TimerSettingsContextProvider>
          <FocusTimer />
        </TimerSettingsContextProvider>
      </main>
    </div>
  );
};

export default Timer;