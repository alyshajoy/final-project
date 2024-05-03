import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function CalendarView() {
    const [currentView, setCurrentView] = useState('dayGridMonth');

    function handleDateClick(arg) {
        alert('Date clicked: ' + arg.dateStr);
    }

    return (
        <div>
            <div>
                <button onClick={() => setCurrentView('dayGridMonth')}>Month</button>
                <button onClick={() => setCurrentView('timeGridWeek')}>Week</button>
                <button onClick={() => setCurrentView('timeGridDay')}>Day</button>
            </div>
            
            <FullCalendar
                key={currentView}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={currentView}
                weekends={true}
                events={[{ title: 'Sample Event', start: new Date() }]}
                dateClick={handleDateClick}
            />
        </div>
    );
}

export default CalendarView;
