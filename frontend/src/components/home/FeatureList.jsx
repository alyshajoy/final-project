import React from 'react';
import FeatureListItem from './FeatureListItem';

function FeatureList() {
  const menuItems = [
    { icon: 'timer-icon.png', text: 'Focus Timer', link: '/timer' },
    { icon: 'calendar-icon.png', text: 'Calendar', link: '/calendar' },
    { icon: 'tasks-icon.png', text: 'To Do List', link: '/tasks' },
    { icon: 'achievement-icon.png', text: 'Badges', link: '/badges' }
  ];

  return (
    <div className="feature-list">
      {menuItems.map(item => (
        <FeatureListItem key={item.text} icon={item.icon} text={item.text} link={item.link} />
      ))}
    </div>
  );
}

export default FeatureList;