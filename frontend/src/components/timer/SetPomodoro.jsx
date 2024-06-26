import { useContext, useState } from "react"
import TimerButton from "./TimerButton"
import { TimerSettingsContext } from "../../contexts/TimerSettingsContext";
import '../../styles/CSS/SetPomodoro.css';


const SetPomodoro = () => {
  const { updateExecute } = useContext(TimerSettingsContext)
  // Default vaulues for pomodoro timer, active key determines which time will run
  const [newTimer, setNewTimer] = useState({
    work: 25,
    shortbreak: 5,
    longbreak: 15,
    active: 'work',
    message: 'Time to work!'
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    updateExecute(newTimer);
  }

  const increment = (timer) => {
    setNewTimer(newTimer => ({
      ...newTimer,
      [timer]: newTimer[timer] + 1
    }))
  }

  const decrement = (timer) => {
    if (newTimer[timer] < 2) {
      setNewTimer(newTimer => ({
        ...newTimer,
        [timer]: 1
      }))
    }
    setNewTimer(newTimer => ({
      ...newTimer,
      [timer]: newTimer[timer] - 1
    }))
    
  }
  return (
    <div className="pomodoro">
    <div className="pomodoro-form-container">
      <h2 className="pomodoro-headers">Settings</h2>
        <div className="timer-setting-bubble">
            <button className="decrement-button" onClick={() => decrement('work')}>-</button>
            <p className="timer-set" name="work" value={newTimer.work}>{newTimer.work}</p>
            <button className="increment-button" onClick={() => increment('work')}>+</button>
        </div>
        <div className="timer-description">
          <h4 className="pomodoro-headers">Set Focus Timer</h4>
        </div>
        <hr className="focus-timer-hr"/>
        <div className="timer-setting-bubble">
          <button className="decrement-button" onClick={() => decrement('shortbreak')}>-</button>
          <p className="timer-set" name="shortbreak" value={newTimer.shortbreak}>{newTimer.shortbreak}</p>
          <button className="increment-button" onClick={() => increment('shortbreak')}>+</button>       
        </div>
        <div className="timer-description">
          <h4 className="pomodoro-headers">Set Shortbreak Timer</h4>
        </div>
        <hr className="focus-timer-hr"/>
        <div className="timer-setting-bubble">
          <button className="decrement-button" onClick={() => decrement('longbreak')}>-</button>
          <p className="timer-set" name="longbreak" value={newTimer.longbreak}>{newTimer.longbreak}</p>
          <button className="increment-button" onClick={() => increment('longbreak')}>+</button>
        </div>
        <div className="timer-description">
          <h4 className="pomodoro-headers">Set Longbreak Timer</h4>
        </div>      
        <hr className="focus-timer-hr"/>
      {newTimer.work > 0 && newTimer.shortbreak > 0 && newTimer.longbreak > 0 ?
      <div className="set-timer-button-wrapper">
        <TimerButton activeClass={"set-timer-button"} title="Set Timer" _callback={handleSubmit} />
      </div>
      : <p className="timer-alert">Set times  must be greater than 0 😖</p>
      }
    </div>
    </div>
  )
}

export default SetPomodoro