//slide down notification.
// hardcoded badges for now

import React from 'react';
import './BadgeNotification.css'; // Assuming your CSS handles images too
import '../styles/BadgeNotification.scss';
import { useNotification } from './NotificationContext';
const BadgeNotification = ({ badge }) => {
  const { notification, hideNotification } = useNotification();
  return notification ? (
    <div className="badge-notification">
      <img src={badge.imageUrl} alt={badge.title} className="badge-image" />
      <div>
        <h4>{badge.title}</h4>
        <p>{badge.description}</p>
        <button onClick={hideNotification}>Close</button>
      </div>
    </div>
  ) : null;
};

export default BadgeNotification;