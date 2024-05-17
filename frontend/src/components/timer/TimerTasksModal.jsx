import { useContext } from "react";
import { TimerSettingsContext } from "../../contexts/TimerSettingsContext";


const TimerTasksModal = () => {
const {
  viewTaskModal,
  newFocusTask,

} = useContext(TimerSettingsContext)
return (
  <div className="modal-overlay">
    <div className="modal-content">
      <button onClick={viewTaskModal}>Close Modal</button>
      <button onClick={e => newFocusTask("Eat Chips")}>Eat Chips</button>
      <button onClick={e => newFocusTask('')}>Clear Focus</button>
    </div>
  </div>
);
};

export default TimerTasksModal