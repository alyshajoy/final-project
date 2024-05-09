import React from 'react';
import './App.css';
import BadgeNotification from './components/BadgeNotification.jsx';
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom';
import {NotificationProvider} from './contexts/NotificationContext';

import Home from './pages/Home.jsx';
import Badges from './pages/Badges.jsx';
import Timer from './pages/Timer.jsx';
import Calendar from './pages/Calendar.jsx';
import Tasks from './pages/Tasks.jsx';
import Register from './pages/Register.jsx';

import WebSocketHandler from './contexts/WebsSocketHandler.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NotificationProvider>
          <BadgeNotification />
          {/*WebsocketHandler for badge notifications */}
          <WebSocketHandler />
          {/* <Link to="/">Home</Link> <br/>
          <Link to="/badges">Badges</Link> <br/>
          <Link to="/timer">Timer</Link> <br/>
          <Link to="/calendar">Calendar</Link> <br/>
          <Link to="/tasks">Tasks</Link> <br/>
          <Link to="/register">Register</Link> <br/> */}
        

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<h2>404 Page not found</h2>} />
          </Routes>
        </NotificationProvider>
      </BrowserRouter>   
      
    </div>
  );
}

export default App;




