import { createContext, useState } from "react";

export const TimerSettingsContext = createContext()

const TimerSettingsContextProvider = (props) => {

  const [pomodoro, setPomodoro] = useState(0);
  const [executing, setExecuting] = useState({});
  const [startAnimate, setStartAnimate] = useState(false);

  const startTimer = () => setStartAnimate(true);
  const pauseTimer = () => setStartAnimate(false);
  const stopTimer = () => setStartAnimate(false);

  const settingBtn = () => {
    setExecuting({})
    setPomodoro(0)
  }

  const updateExecute = (updatedSettings) => {
    setExecuting(updatedSettings)
    setTimerTime(updatedSettings)
  } 

  const setTimerTime = evaluate => {

    switch (evaluate.active) {
      case 'work': 
        setPomodoro(evaluate.work)
        break;
      case 'shortbreak': 
        setPomodoro(evaluate.shortbreak)
        break;
      case 'longbreak': 
        setPomodoro(evaluate.longbreak)
        break;


      default:
        setPomodoro(0)
        break;
    }
  }
  
  return (
    <div>
      <TimerSettingsContext.Provider value={{stopTimer, updateExecute}}>
        {props.children}
      </TimerSettingsContext.Provider>
    </div>
  )
}
export default TimerSettingsContextProvider;