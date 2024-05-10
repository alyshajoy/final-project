//slide down notification.
// hardcoded badges for now

import React from 'react';
import '../styles/CSS/BadgeNotification.css'; // Assuming your CSS handles images too
import { useNotification } from '../contexts/NotificationContext';
const BadgeNotification = () => {
  const { notification, hideNotification } = useNotification();
  return notification ? (
    <div className="badge-notification">
      <img src={notification.imageUrl} alt={notification.title} className="badge-image" />
      <div>
        <h4>{notification.title}</h4>
        <p>{notification.description}</p>
        <button onClick={hideNotification}>Close</button>
      </div>
    </div>
  ) : null;
};

export default BadgeNotification;