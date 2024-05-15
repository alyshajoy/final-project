import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CSS/Home.css';
import Header from '../components/home/Header.jsx';
import FeatureList from '../components/home/FeatureList.jsx';

const Home = () => {
  return (
    <div>
      <Header />
      <FeatureList />
      {/* <ul>
        <li><Link to="/badges">Badges</Link></li>
        <li><Link to="/timer">Timer</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
      </ul> */}
    </div>
  );
};

export default Home;
