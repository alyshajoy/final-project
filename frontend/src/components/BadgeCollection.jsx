// User's badge collection here

import '../styles/CSS/BadgeCollection.css';

const BadgeCollection = ({badgesData}) => {

  return (
    <div className="badge-collection">
      <h1 className="badge-collection-title">My Badge Collection</h1>
      <div className="badge-list">
        {badgesData.map(badge => (
          <div className={`badge-item ${badge.status ? '' : 'inactive'}`} key={badge.id}>
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