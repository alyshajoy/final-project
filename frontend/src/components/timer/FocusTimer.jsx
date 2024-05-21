import { useContext, useEffect } from "react";
import SetPomodoro from "./SetPomodoro";
import CountdownAnimation from "./CountdownAnimation";
import TimerButton from "./TimerButton";
import TimerTasksModal from "./TimerTasksModal";
import { TimerSettingsContext } from "../../contexts/TimerSettingsContext";
import "../../styles/CSS/FocusTimer.css";
import Footer from "../home/Footer";

const focusIcon = "focustask ico.png";

const FocusTimer = (props) => {

  const {
    pomodoro,
    executing,
    setCurrentTimer,
    settingBtn,
    children,
    startAnimate,
    startTimer,
    pauseTimer,
    updateExecute,
    openTaskModal,
    viewTaskModal,
    focusTask,
    fetchUser,
    userInfo,
    minutes
  } = useContext(TimerSettingsContext);

  //Hard coded user info for demo

  useEffect(() => {
    console.log(minutes);
  }, [minutes])

  useEffect(() => {
    updateExecute(executing);
    return () => {
      console.log(`Cleanup: Stopping execution-related operations for ${executing}`) 
    }
  }, [executing]);

  useEffect(() => {
    fetchUser(1);
    return () => {
      console.log(`Cleanup: Component unmounted`);
    }
  }, [fetchUser]);

  useEffect(() => {
    console.log(`Start Animate: ${startAnimate}, UserInfo: ${userInfo}`);
    return () => {
      console.log(`Cleanup: Stopping animation or user related operations`);

    };
  }, [startAnimate, userInfo]);

  // useEffect(() => updateExecute(executing), [executing, startAnimate] );

  return (
    <div className="focus-timer-container">
      <h1>Focus Timer</h1>
      {pomodoro === 0 ? (
        <SetPomodoro />
      ) : (
        <>
          <div className="pomodoro-headers">
            <h3>
              <em>{executing.active && executing.message}</em>
            </h3>
          </div>
          <div className="timer-labels">
            <TimerButton
              title="Focus"
              activeClass={executing.active === "work" && "active-label"}
              _callback={() => setCurrentTimer("work", "Time To Work!")}
            />
            <TimerButton
              title="Short Break"
              activeClass={executing.active === "shortbreak" && "active-label"}
              _callback={() =>
                setCurrentTimer("shortbreak", "Time To Take A Break 🍵")
              }
            />
            <TimerButton
              title="Long Break"
              activeClass={executing.active === "longbreak" && "active-label"}
              _callback={() =>
                setCurrentTimer("longbreak", "Time To Take A Long Break 🐢")
              }
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
            <TimerButton
              title="Start"
              activeClass={startAnimate && "active"}
              _callback={startTimer}
            />
            <TimerButton
              title="Pause"
              activeClass={!startAnimate && "active"}
              _callback={pauseTimer}
            />
          </div>
          <div className="toggle-focus-task-container">
            <div className="focus-task-button-wrapper">
              <img
                src={require(`../../assets/timerpage_icons/${focusIcon}`)}
                alt="Focus task icon"
                onClick={viewTaskModal}
              />
            </div>
            <div className="timer-task-label">
              <h4>
                {focusTask === '' ? (
                  <em>Select a task to focus on.</em>
                ) : (
                  <div className="focus-task-name">
                    <em>{focusTask}</em>
                  </div>
                )}
              </h4>
            </div>
          </div>
          <div className="settings-button">
            <TimerButton title="Settings" _callback={settingBtn} />
          </div>
          {openTaskModal && 
            <TimerTasksModal />
          }
        </>
      )}
      <Footer />
    </div>
  );
};

export default FocusTimer;
