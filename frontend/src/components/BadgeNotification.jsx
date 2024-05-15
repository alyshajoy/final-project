//slide down notification.
// hardcoded badges for now

import React from 'react';
import '../styles/CSS/BadgeNotification.css'; // Assuming your CSS handles images too
import Confetti from 'react-dom-confetti';
import { useNotification } from '../contexts/NotificationContext';
const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 20,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};
const BadgeNotification = () => {
  const { notification, hideNotification } = useNotification();
  if (!notification) {
    return null;
  }
  return (
    <div className={`badge-notification ${notification ? 'active' : ''}`}>
      <Confetti active={!!notification} config={confettiConfig} />
      <h4 className="notification-title">{notification.title}</h4>
      <button className="close-button" onClick={hideNotification}>Close</button>
      <div>
              <img src={notification.imageUrl} alt={notification.title} className="badge-image" />
        <p className="notification-description">{notification.description}</p>
      </div>
    </div>
  );
};

export default BadgeNotification;