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

  const handleChange = input => {
    const {name, value} = input.target
    // Switch statement used to overide current timer values
    switch (name) {
      case 'work':
        setNewTimer({
          ...newTimer,
          work: parseInt(value)
        })
        break;

      case 'shortbreak':
        setNewTimer({
          ...newTimer,
          shortbreak: parseInt(value)
        })
        break;

      case 'longbreak':
        setNewTimer({
          ...newTimer,
          longbreak: parseInt(value)
        })
        break;

      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExecute(newTimer);
  }

  return (
    <div className="pomodoro-form-container">

      <form noValidate>
        <div className="pomodoro-input-wrapper">
          <input className="input" name="work" onChange={handleChange} value={newTimer.work}/>
          <input className="input" name="shortbreak" onChange={handleChange} value={newTimer.shortbreak}/>
          <input className="input" name="longbreak" onChange={handleChange} value={newTimer.longbreak}/>
        </div>
        <TimerButton title="Set Timer" _callback={handleSubmit} />
      </form>
    </div>
  )
}

export default SetPomodoro