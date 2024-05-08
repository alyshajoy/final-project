import { useContext } from "react";
import SetPomodoro from "./SetPomodoro";
import CountdownAnimation from "./CountdownAnimation";
import TimerButton from "./TimerButton";
import { TimerSettingsContext } from "../../contexts/TimerSettingsContext";

const FocusTimer = () => {
  const { 
    pomodoro,
    executing,
    setCurrentTimer,
    settingBtn,
    children,
    startAnimate,
    startTimer,
    pauseTimer
  } = useContext(TimerSettingsContext)
  return (
    <div className="container">
      <h1>Pomodoro</h1>
      <small>Be Productive the right way.</small>
        {pomodoro === 0 ?
          <SetPomodoro /> :
          <>
          <ul className="timer-labels">
            <li>
              <TimerButton
                title="Work"
                activeClass={executing.active === 'work' && "active-label"}
                _callback={() => setCurrentTimer('work')}
              />
            </li>
            <li>
              <TimerButton
                title="Short Break"
                activeClass={executing.active === 'shortbreak' && "active-label"}
                _callback={() => setCurrentTimer('shortbreak')}
              />
            </li>
            <li>
              <TimerButton
                title="Long Break"
                activeClass={executing.active === 'longbreak' && "active-label"}
                _callback={() => setCurrentTimer('longbreak')}
              />
            </li>
          </ul>

          <TimerButton title="Settings" _callback={settingBtn} />
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
            <TimerButton title="Start" classname={ !startAnimate && 'active'} _callback={startTimer} />
            <TimerButton title="Pause" classname={ !startAnimate && 'active'} _callback={pauseTimer} />
          </div>
          </>
        }
    </div>
  );
}

export default FocusTimer
