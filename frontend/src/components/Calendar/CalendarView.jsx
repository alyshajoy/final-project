import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function CalendarView({ events, setSelectedDate, setSelectedStartTime, setSelectedEndTime }) {
  const [currentView, setCurrentView] = useState('dayGridMonth');

  function handleDateSelect(selectInfo) {
    let currentDate;
    if (selectInfo.view.type === 'timeGridDay' || selectInfo.view.type === 'timeGridWeek') {
        // Use the selected date and time when the view allows selecting specific times
        currentDate = new Date(selectInfo.startStr);
    } else {
        // Use the current date and time otherwise
        currentDate = new Date();
    }

    let endDate = new Date(currentDate.getTime() + 60 * 60 * 1000); // Add one hour
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let endHours = endDate.getHours();

    // Rounding minutes to the nearest half-hour
    if (minutes < 15) {
        minutes = '00';
    } else if (minutes < 45) {
        minutes = '30';
    } else {
        minutes = '00';
        hours++; // Increment hour if minutes are greater than 45
        endHours++; // Ensure the endHours increment as well
    }

    // Format hours to ensure it always appears as two digits
    hours = hours % 24; // Adjust in case of overflow past midnight
    endHours = endHours % 24; // Adjust endHours similarly
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedEndHours = endHours < 10 ? `0${endHours}` : `${endHours}`;

    const startTime = `${formattedHours}:${minutes}`;
    const endTime = `${formattedEndHours}:${minutes}`;

    setSelectedDate(selectInfo.startStr.split('T')[0]);
    setSelectedStartTime(startTime);
    setSelectedEndTime(endTime);
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
              events={events}
              selectable={true}
              selectMirror={true}
              select={handleDateSelect}
          />
      </div>
  );
}

export default CalendarView;
