import { useState } from "react"
import TimerButton from "./TimerButton"

const SetPomodoro = () => {
  // Default vaulues for pomodoro timer, active key determines which time will run
  const [newTimer, setNewTimer] = useState({
    work: 0.3,
    shortbreak: 0.2,
    longbreak: 1,
    active: 'work'
  });
  return (
    <div className="pomodoro-form-container">

      <form noValidate>
        <div className="pomodoro-input-wrapper">
          <input className="input" name="work" onChange={handleChange} />
          <input className="input" name="shortbreak" onChange={handleChange} />
          <input className="input" name="longbreak" onChange={handleChange} />
        </div>
        <TimerButton title="Set_Timer" _callback={handleSubmit} />
      </form>
    </div>
  )
}

export default SetPomodoro