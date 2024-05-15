import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CSS/Home.css';

const Home = () => {
  return (
    <div>
      <h1>ADHD Toolkit</h1>
      <ul>
        <li><Link to="/badges">Badges</Link></li>
        <li><Link to="/timer">Timer</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
      </ul>
    </div>
  );
};

export default Home;
