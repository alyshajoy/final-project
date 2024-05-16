import { createContext, useState } from "react";

export const TimerSettingsContext = createContext()

const TimerSettingsContextProvider = (props) => {

  const [pomodoro, setPomodoro] = useState(0);
  const [executing, setExecuting] = useState({});
  const [startAnimate, setStartAnimate] = useState(false);

  const startTimer = () => {
    setStartAnimate(true);
    // Run timer_active check

  }
  const pauseTimer = () => setStartAnimate(false);
  const stopTimer = () => setStartAnimate(false);

  const settingBtn = () => {
    setExecuting({})
    setPomodoro(0)
  }

  const setCurrentTimer = (active_state, timer_message) => {
    updateExecute({
      ...executing,
      active: active_state,
      message: timer_message
    })
    setTimerTime(executing);
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
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60

    return `${minutes}m ${seconds}s`
  }

  return (
    <div>
      <TimerSettingsContext.Provider value={{
        stopTimer, 
        updateExecute,
        pomodoro,
        executing,
        startAnimate,
        startTimer,
        pauseTimer,
        settingBtn,
        setCurrentTimer,
        children
        }}>
        {props.children}
      </TimerSettingsContext.Provider>
    </div>
  )
}
export default TimerSettingsContextProvider;