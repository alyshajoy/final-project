import { createContext, useState } from "react";

export const TimerSettingsContext = createContext()

const TimerSettingsContextProvider = (props) => {

  const [pomodoro, setPomodoro] = useState(0);
  const [executing, setExecuting] = useState({});
  const [startAnimate, setStartAnimate] = useState(false);

  const startTimer = () => setStartAnimate(true);
  const pauseTimer = () => setStartAnimate(false);
  const stopTimer = () => setStartAnimate(false);

  const updateExecute = (updatedSettings) => setExecuting(updatedSettings)
  
  return (
    <div>
      <TimerSettingsContext.Provider value={{stopTimer, updateExecute}}>
        {props.children}
      </TimerSettingsContext.Provider>
    </div>
  )
}
export default TimerSettingsContextProvider;