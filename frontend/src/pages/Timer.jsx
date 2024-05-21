import React from "react";
import FocusTimer from '../components/timer/FocusTimer'
import HomeButton from "../components/buttons/HomeButton";

const Timer = () => {
  return (
    <div>
      <main>
          <HomeButton />
          <FocusTimer />
      </main>
    </div>
  );
};

export default Timer;