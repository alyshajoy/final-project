import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';
import "../../assets/homepage_icons/timer-icon.png";

const ListItemTimer = () => {

  const handleItemTimer = () => {
    console.log('timer clicked');
  }

  return (
    <>
      <a href={"/timer"} className="list-item-timer">
      <img src={require(`../../assets/homepage_icons/timer-icon.png`)} alt={'Focus Timer'} onClick={handleItemTimer}/>
    </a>
    </>
  )
};

export default ListItemTimer;