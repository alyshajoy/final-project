import React from 'react';
import FeatureListItem from './FeatureListItem';

function FeatureList() {
  const menuItems = [
    { icon: 'timer_icon.png', text: 'Focus Timer', link: '/timer' },
    { icon: 'calendar_icon.png', text: 'Calendar', link: '/calendar' },
    { icon: 'todo_icon.png', text: 'To Do List', link: '/tasks' },
    { icon: 'achievement_icon.png', text: 'Achievements', link: '/achievements' }
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