import React, { useContext, useState, useEffect } from "react";
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

  const handleItemTimer = () => {
    updateExecute(newTimer);  
    newFocusTask(props.title);
  }

  const handleRedirect = () => {
    navigate('/timer');
  }

  const handleClick = async () => {
    handleRedirect();
    await new Promise(resolve => setTimeout(resolve, 0)); // Ensure redirect happens first
    handleItemTimer();
  };

    // Use useEffect to log the pomodoro state whenever it changes
    // useEffect(() => {
    //   console.log('pomodoro', pomodoro);
    //   console.log('focus task', focusTask);
    // }, [pomodoro]);

  return (
    <>
    <div className="list-item-timer">
      <img src={require(`../../assets/homepage_icons/timer-icon.png`)} alt={'Focus Timer'} onClick={handleClick}/>
    </div>
    </>
  )
};

export default ListItemTimer;