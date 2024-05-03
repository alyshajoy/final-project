import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ViewSelector from './ViewSelector';

function CalendarView() {

  const [currentView, setCurrentView] = useState('dayGridMonth');
    
  function handleDateClick(arg) {
       alert('Date clicked: ' + arg.dateStr);
  }

  console.log("Current View:", currentView);


  return (
      <div>
        <ViewSelector currentView={currentView} setCurrentView={setCurrentView} />
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={[{ title: 'Sample Event', start: new Date() }]}
          dateClick={handleDateClick}
        />
    </div>
  );
}

export default CalendarView;