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

  // const handleChange = timer-set => {
  //   const {name, value} = timer-set.target
  //   // Switch statement used to overide current timer values
  //   switch (name) {
  //     case 'work':
  //       setNewTimer({
  //         ...newTimer,
  //         work: parseInt(value)
  //       })
  //       break;

  //     case 'shortbreak':
  //       setNewTimer({
  //         ...newTimer,
  //         shortbreak: parseInt(value)
  //       })
  //       break;

  //     case 'longbreak':
  //       setNewTimer({
  //         ...newTimer,
  //         longbreak: parseInt(value)
  //       })
  //       break;

  //     default:
  //       break;
  //   }
  // }

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
        <div className="pomodoro-timer-set-wrapper">
          <button onClick={() => decrement('work')}>-</button>
          <p className="timer-set" name="work" value={newTimer.work}>{newTimer.work}</p>
          <button onClick={() => increment('work')}>+</button>
          <br />
          <button onClick={() => decrement('shortbreak')}>-</button>
          <p className="timer-set" name="shortbreak" value={newTimer.shortbreak}>{newTimer.shortbreak}</p>
          <button onClick={() => increment('shortbreak')}>+</button>
          <br />
          <button onClick={() => decrement('longbreak')}>-</button>
          <p className="timer-set" name="longbreak" value={newTimer.longbreak}>{newTimer.longbreak}</p>
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