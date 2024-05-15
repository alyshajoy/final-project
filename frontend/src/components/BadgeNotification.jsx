//slide down notification.
// hardcoded badges for now

import React from 'react';
import '../styles/CSS/BadgeNotification.css'; // Assuming your CSS handles images too
import { useNotification } from '../contexts/NotificationContext';
const BadgeNotification = () => {
  const { notification, hideNotification } = useNotification();
  return notification ? (
    <div className="badge-notification">
      <h4 className="notification-title">{notification.title}</h4>
      <button className="close-button" onClick={hideNotification}>Close</button>
      <div>
              <img src={notification.imageUrl} alt={notification.title} className="badge-image" />
        <p className="notification-description">{notification.description}</p>
      </div>
    </div>
  ) : null;
};

export default BadgeNotification;