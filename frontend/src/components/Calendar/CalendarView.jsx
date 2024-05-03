import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function CalendarView() {
    const [currentView, setCurrentView] = useState('dayGridMonth');
    const [selectedDate, setSelectedDate] = useState(null);

    function handleDateSelect(selectInfo) {
      const date = selectInfo.startStr; // Get the start string, which is the selected date
      setSelectedDate(date); // Save the selected date to state
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
                selectable={true}
                selectMirror={true}
                select={handleDateSelect}
            />
        </div>
    );
}

export default CalendarView;
