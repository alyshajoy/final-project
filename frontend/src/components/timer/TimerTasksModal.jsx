import { useContext } from "react";
import { TimerSettingsContext } from "../../contexts/TimerSettingsContext";
import '../../styles/CSS/TimerTasksModal.css'

const tasks = [
  {
    task_id: 1,
    title: "Finish Project",
    completed: false,
    priority: 1
  },
  {
    task_id: 2,
    title: "Start Blog Post",
    completed: false,
    priority: 3
  },
  {
    task_id: 3,
    title: "Update Resume",
    completed: false,
    priority: 2
  },
  {
    task_id: 4,
    title: "Write draft for email",
    completed: false,
    priority: 3
  },
  {
    task_id: 5,
    title: "Read Chapter 1",
    completed: false,
    priority: 1
  },
]

const TimerTasksModal = () => {

const {
  viewTaskModal,
  newFocusTask,

} = useContext(TimerSettingsContext)

const taskmodalmap = tasks.map((el) => (
  <li key={el.task_id}>
      <div className="timer-task-item">
        <p>{el.title}</p>
        <button onClick={e => newFocusTask(el.title)}>Focus Task</button>
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