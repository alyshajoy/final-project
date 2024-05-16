import React, { useState, useEffect } from "react";
import BadgeCollection from "../components/BadgeCollection";
import HomeButton from "../components/buttons/HomeButton";
const Badges = () => {
  const [badgesData, setBadgesData] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3001/api/badges/')
      .then(response => response.json())
      .then(data => setBadgesData(data))
      .then(console.log('Success:', badgesData))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <HomeButton />
      <h1>Badges</h1>
      <header className="App-header">
      <BadgeCollection badgesData={badgesData}/>
    </header>
    </div>
    
  );
};

export default Badges;