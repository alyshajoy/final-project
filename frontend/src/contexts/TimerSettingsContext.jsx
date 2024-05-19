import { createContext, useCallback, useState, useMemo } from "react";


export const TimerSettingsContext = createContext()

const TimerSettingsContextProvider = (props) => {

  const [pomodoro, setPomodoro] = useState(0);
  const [executing, setExecuting] = useState({});
  const [startAnimate, setStartAnimate] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [focusTask, setFocusTask] = useState("");
  const [userInfo, setUserInfo] = useState([]);

  const viewTaskModal = () => {
    if (!openTaskModal) {
      setOpenTaskModal(true);
      console.log("This is from context: !", openTaskModal)
    } else {
      setOpenTaskModal(false);
      console.log("This is from context: !", openTaskModal)
    };
  }

  // Function used to select tasks to focus
  const newFocusTask = (task) => {
    setFocusTask(task);
  }

  // Fetch all user timer information

  const fetchUser = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/timer/${id}`)
      if (!response.ok) new Error ('User data failed to fetch')
      const jsonData = await response.json();
  
      setUserInfo(jsonData);
  
    } catch (err) {
      console.error(`Error message from userProfile: ${err.message}`)
    }
    
  }, []);
  
  const contextValue = useMemo(() => ({ userInfo, fetchUser}), [userInfo, fetchUser])

  const startTimer = async() => {
    setStartAnimate(true);
    // Set timer_active to true
    try {
      const response = await fetch(`http://localhost:3001/api/timer/update/timer_status/1`, {
        method: "PUT",
        headers: { accept: "application/json" }
      })
      console.log(response);
    } catch (err) {
      console.error(`Error message from startTimer: ${err.message}`)
    }
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
        children,
        openTaskModal,
        viewTaskModal,
        focusTask,
        newFocusTask,
        userInfo,
        fetchUser,
        }}>
        {props.children}
      </TimerSettingsContext.Provider>
    </div>
  )
}
export default TimerSettingsContextProvider;