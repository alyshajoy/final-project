import { useContext, useEffect, useState } from "react";
import { TimerSettingsContext } from "../../contexts/TimerSettingsContext";
import '../../styles/CSS/TimerTasksModal.css'
import Checkbox from "../Tasks/Checkbox.jsx";

const TimerTasksModal = () => {

const focusIcon = "timer-icon.png";


const {
  viewTaskModal,
  newFocusTask,

} = useContext(TimerSettingsContext)

const [timerTasks, setTimerTasks] = useState([]);
const [checkedTasks, setCheckedTasks] = useState({});


useEffect(() => {
  const getTimerTasks = async() => {
    try {
      const response = await fetch('http://localhost:3001/api/tasks/')
      if (!response.ok) throw new Error ('Data failed to fetch'); 
      const jsonData = await response.json();
      setTimerTasks(jsonData)

      const initialCheckedTasks = jsonData.reduce((acc, task) => {
        acc[task.id] = task.completed;
        return acc;
      }, {});
      setCheckedTasks(initialCheckedTasks);

    } catch (err) {
      console.error("getTimerTasks error message:", err.message)
    }
  }
  getTimerTasks()
}, []);

const handleComplete = (id) => {
  console.log('Tasks:', timerTasks); // Log current tasks
  const task = timerTasks.find(task => task.id === id);

  if (!task) {
    console.error(`Task with id ${id} not found`);
    return;
  }
  console.log('Task found:', task); // Log the found task
  const newStatus = !task.completed;

  fetch(`/api/tasks/${id}/completed`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ completed: newStatus }) // Ensure JSON body is sent
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Failed to mark task as completed');
    }
    return res.json();
  })
  .then(updatedTask => {
    console.log('Completed task data:', updatedTask);
    
    const updatedTasksList = timerTasks.map(t => {
      if (t.id === id) {
        return updatedTask;
      }
      return t;
    });
    setTimerTasks(updatedTasksList);
    setCheckedTasks(prevCheckedTasks => ({
      ...prevCheckedTasks,
      [id]: updatedTask.completed,
    }));
  })
  .catch(error => {
    console.error('Error completing task:', error);
  });
};


const taskmodalmap = timerTasks.map((el, index) => (
  <li key={index}>
      <div className="timer-task-item">
        <div><Checkbox handleComplete={handleComplete} id={el.id} task={el} checkedTasks={checkedTasks} setCheckedTasks={setCheckedTasks}/></div>
        <p><b>{el.title}</b></p>
        <img
                src={require(`../../assets/homepage_icons/${focusIcon}`)}
                alt="Focus task icon"
                onClick={e => newFocusTask(el.title)}
              />
      </div>
        
        <hr className="task-seperator" />
  </li>
))

return (
  <div className="tasks-modal-overlay">
    <div className="tasks-modal-content">
        <h3 className="pomodoro-headers">To-Do List</h3>
      <div className="tasks-modal-header">
        <img src={require("../../assets/homepage_icons/back.png")} alt="back" onClick={viewTaskModal}/>
        <button onClick={e => newFocusTask('')}>Clear Focus Task</button>
      </div>
      <div className="timer-tasks-wrapper">
        <ul className="timer-task-list">
          {taskmodalmap}
        </ul>
      </div>
        
    </div>
  </div>
);
};

export default TimerTasksModal