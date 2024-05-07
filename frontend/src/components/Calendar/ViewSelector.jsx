import React from 'react';

function ViewSelector({ currentView, setCurrentView }) {
    return (
        <div>
            <button onClick={() => setCurrentView('dayGridMonth')} disabled={currentView === 'dayGridMonth'}>Month</button>
            <button onClick={() => setCurrentView('timeGridWeek')} disabled={currentView === 'timeGridWeek'}>Week</button>
            <button onClick={() => setCurrentView('timeGridDay')} disabled={currentView === 'timeGridDay'}>Day</button>
        </div>
    );
}

export default ViewSelector;