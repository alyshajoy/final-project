import { useContext, useEffect } from "react";
import SetPomodoro from "./SetPomodoro";
import CountdownAnimation from "./CountdownAnimation";
import TimerButton from "./TimerButton";
import { TimerSettingsContext } from "../../contexts/TimerSettingsContext";
import '../../styles/CSS/FocusTimer.css';


const FocusTimer = () => {
  const { 
    pomodoro,
    executing,
    setCurrentTimer,
    settingBtn,
    children,
    startAnimate,
    startTimer,
    pauseTimer,
    updateExecute
  } = useContext(TimerSettingsContext)

useEffect(() => updateExecute(executing), [executing, startAnimate])

console.log(pomodoro);
console.log(executing.active === 'work');

  return (
    <div className="container">
      <h1>Focus Timer</h1>
        {pomodoro === 0 ?
          <SetPomodoro /> :
          <>
      <div className="pomodoro-message">
        <h3>
        {executing.active && executing.message}
        </h3>
      </div>
      <div className="timer-labels">
        <TimerButton
          title="Focus"
            activeClass={executing.active === 'work' && "active-label"}
            _callback={() => setCurrentTimer('work', "Time To Work!")}
          />
        <TimerButton
          title="Short Break"
          activeClass={executing.active === 'shortbreak' && "active-label"}
          _callback={() => setCurrentTimer('shortbreak', "Time To Take A Break 🍵")}
        />
        <TimerButton
          title="Long Break"
          activeClass={executing.active === 'longbreak' && "active-label"}
          _callback={() => setCurrentTimer('longbreak', 'Time To Take A Long Break 🐢')}
        />
      </div>

            <div className="time-wrapper">
          <CountdownAnimation
            key={pomodoro}
            timer={pomodoro}
            animate={startAnimate}
          >
            {children}
          </CountdownAnimation>
            </div>
          <div className="button-wrapper">
            <TimerButton title="Start" activeClass={ startAnimate && 'active'} _callback={startTimer} />
            <TimerButton title="Pause" activeClass={ !startAnimate && 'active'} _callback={pauseTimer} />
        </div>
        <div className="settings-button">
          <TimerButton title="Settings" _callback={settingBtn} />
      </div>
          </>
          
        }

    </div>
  );
}

export default FocusTimer
