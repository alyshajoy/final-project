import { useContext, useState } from "react"
import TimerButton from "./TimerButton"
import { TimerSettingsContext } from "../../contexts/TimerSettingsContext";

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
    setNewTimer(newTimer => ({
      ...newTimer,
      [timer]: newTimer[timer] - 1
    }))
  }
  return (
    <div className="pomodoro-form-container">
        <div className="pomodoro-input-wrapper">
          <button onClick={() => decrement('work')}>-</button>
          <p className="input" name="work" value={newTimer.work}>{newTimer.work}</p>
          <button onClick={() => increment('work')}>+</button>
          <br />
          <button onClick={() => decrement('shortbreak')}>-</button>
          <p className="input" name="shortbreak" value={newTimer.shortbreak}>{newTimer.shortbreak}</p>
          <button onClick={() => increment('shortbreak')}>+</button>
          <br />
          <button onClick={() => decrement('longbreak')}>-</button>
          <p className="input" name="longbreak" value={newTimer.longbreak}>{newTimer.longbreak}</p>
          <button onClick={() => increment('longbreak')}>+</button>
          <br />
        </div>
        {newTimer.work > 0 && newTimer.shortbreak > 0 && newTimer.longbreak > 0 ? 
        <TimerButton title="Set Timer" _callback={handleSubmit} />
        : <p className="timer-alert">Break times must be greater than 0 😖</p>
        }
    </div>
  )
}

export default SetPomodoro