import React from 'react';

function FeatureListItem({ icon, text, link }) {
  return (
    <a href={link} className="feature-list-item">
      <img src={require(`../../assets/homepage_icons/${icon}`)} alt={text} />
      <span>{text}</span>
    </a>
  );
}

export default FeatureListItem;