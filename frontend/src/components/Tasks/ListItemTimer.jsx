import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { TimerSettingsContext } from "../../contexts/TimerSettingsContext";
import "../../assets/homepage_icons/timer-icon.png";


const ListItemTimer = (props) => {

  const  {pomodoro, setPomodoro, focusTask, newFocusTask, updateExecute} = useContext(TimerSettingsContext);

  const navigate = useNavigate();

  const [newTimer, setNewTimer] = useState({
    work: 25,
    shortbreak: 5,
    longbreak: 15,
    active: 'work',
    message: 'Time to work!'
  });

  const handleItemTimer = (e) => {
    updateExecute(newTimer);  
    newFocusTask(props.title);
  }

  const handleRedirect = () => {
    navigate('/timer');
  }

  return (
    <>
    <div className="list-item-timer">
      <img src={require(`../../assets/homepage_icons/timer-icon.png`)} alt={'Focus Timer'} onClick={handleRedirect}/>
    </div>
    {console.log('pomodoro', pomodoro)}
    </>
  )
};

export default ListItemTimer;