//slide down notification.
// hardcoded badges for now

import React from 'react';
import './BadgeNotification.css'; // Assuming your CSS handles images too
import '../styles/BadgeNotification.scss';
const BadgeNotification = ({ badge }) => {
  return (
    <div className="badge-notification">
      <img src={badge.imageUrl} alt={badge.title} className="badge-image" />
      <div>
        <h4>{badge.title}</h4>
        <p>{badge.description}</p>
      </div>
    </div>
  );
};

export default BadgeNotification;