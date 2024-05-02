import React from 'react';
import './App.css';
import Main from './components/main';
import FocusTimerRoute from './routes/FocusTimerRoute';

import BadgeCollection from './components/BadgeCollection.jsx';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Achievement Notifications Demo</h1>
        <BadgeCollection />
      </header>
      <div>
        <Main></Main>
      </div>
      <main>Hello World!
      <FocusTimerRoute />

    </main>
    </div>
  );
}

export default App;




