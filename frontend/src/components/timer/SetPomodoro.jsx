
import TimerButton from "./TimerButton"

const SetPomodoro = () => {

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