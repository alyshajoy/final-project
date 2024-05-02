// User's badge collection here

import React, { useState, useEffect } from 'react';
import '../styles/BadgeCollection.scss';

const badgesData = [
  {
    id: 1,
    title: "Hustler",
    description: "Completed 5 tasks",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1038/1038103.png"  // Compass icon
  },
  {
    id: 2,
    title: "Focused",
    description: "Used a timer longer than 30 minutes!",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1060/1060003.png"  // Medal icon
  },
  {
    id: 3,
    title: "Collector",
    description: "Collected more than 3 badges!",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"  // Butterfly icon
  },
];
const BadgeCollection = ({ }) => {
  return (
    <div className="badge-collection">
      <h1 className="badge-collection-title">My Badge Collection</h1>
      <div className="badge-list">
        {badgesData.map(badge => (
          <div className="badge-item" key={badge.id}>
            <img className="badge-image" src={badge.imageUrl} alt={badge.title} />
            <div className="badge-details">
              <h3 className="badge-title">{badge.title}</h3>
              <p className="badge-description">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeCollection;