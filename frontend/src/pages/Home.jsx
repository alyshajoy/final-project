import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        <li><Link to="/badges">Badges</Link></li>
        <li><Link to="/timer">Timer</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </div>
  );
};

export default Home;
