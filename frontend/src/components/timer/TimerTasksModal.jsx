import { useContext, useEffect, useState } from "react";
import { TimerSettingsContext } from "../../contexts/TimerSettingsContext";
import '../../styles/CSS/TimerTasksModal.css'

const TimerTasksModal = () => {

const {
  viewTaskModal,
  newFocusTask,

} = useContext(TimerSettingsContext)

const [timerTasks, setTimerTasks] = useState([]);

useEffect(() => {
  const getTimerTasks = async() => {
    try {
      const response = await fetch('http://localhost:3001/api/tasks/timer')
      if (!response.ok) throw new Error ('Data failed to fetch'); 
      const jsonData = await response.json();
      setTimerTasks(jsonData)

    } catch (err) {
      console.error("getTimerTasks error message:", err.message)
    }
  }
  getTimerTasks()
}, []);


const taskmodalmap = timerTasks.map((el, index) => (
  <li key={index}>
      <div className="timer-task-item">
        <p>{el.title}</p>
        <button onClick={e => newFocusTask(el.title)}>Focus Task</button>
      </div>
        <div className="timer-task-description">
        <small>{el.description}</small>
        </div>
        <hr className="task-seperator" />
  </li>
))

return (
  <div className="tasks-modal-overlay">
    <div className="tasks-modal-content">
      <div className="tasks-modal-header">
        <button onClick={e => newFocusTask('')}>Clear Focus Task</button>
        <button onClick={viewTaskModal}>X</button>
      </div>
        <ul className="timer-task-list">
          {taskmodalmap}
        </ul>
        
    </div>
  </div>
);
};

export default TimerTasksModal