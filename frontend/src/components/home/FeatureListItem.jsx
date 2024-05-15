import React from 'react';

function FeatureListItem({ icon, text, link }) {
  return (
    <div className="feature-list-item">
      <img src={require(`../../assets/homepage_icons/${icon}`)} alt={text} />
      <a href={link}>{text}</a>
    </div>
  );
}

export default FeatureListItem;