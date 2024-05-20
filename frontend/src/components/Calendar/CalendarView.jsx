import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../styles/CSS/Calendar.css';

function CalendarView({ events, selectedDate, setSelectedDate, setSelectedStartTime, setSelectedEndTime, onDoubleClickEvent }) {
  const [currentView, setCurrentView] = useState('dayGridMonth');

  let clickTimer = useRef(null);

  const handleEventClick = (clickInfo) => {
    if (clickTimer && clickTimer.current === null) {
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null;
      }, 300);
    } else if (clickTimer && clickTimer.current !== null) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      onDoubleClickEvent(clickInfo.event);
    }
  };

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

  function renderEventContent(eventInfo) {
    const viewType = eventInfo.view.type;
  
    // Specific handling for the Month view (dayGridMonth)
    if (viewType === 'dayGridMonth') {
      // For Month view, show only the event time
      return (
        <div className="custom-event-time-only">
          {eventInfo.event.start.toLocaleTimeString([], { hourCycle: 'h23', hour: 'numeric', minute: '2-digit', hour12: true })}
        </div>
      );
    }
  
    // Handling for the Week view (timeGridWeek)
    if (viewType === 'timeGridWeek') {
      return (
        <div className="custom-event-title">
          {eventInfo.event.title}
        </div>
      );
    }
  
    // Default rendering for other views
    return (
      <div>
        <div className="custom-event-time">
          {eventInfo.timeText}
        </div>
        <div className="custom-event-title">
          {eventInfo.event.title}
        </div>
      </div>
    );
  }

  return (
      <div>
          
          <FullCalendar
            key={events.length}
            timeZone='UTC'
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={currentView}
            contentHeight="auto"
            weekends={true}
            events={events}
            selectable={true}
            selectMirror={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            headerToolbar={{
                left: 'prev,title,next',
                center: '',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            
            views={{
                dayGridMonth: { // Applies to the month view
                  titleFormat: { year: 'numeric', month: 'long' }, // "May 2024"
                  eventTimeFormat: { // Specify the time format for events
                      hour: 'numeric',
                      minute: '2-digit',
                      meridiem: 'short',
                      hour12: true
                    }
                },
                timeGridWeek: { // Applies to the week view
                    titleFormat: { month: 'long', day: 'numeric', omitCommas: true }, // "May 5 - 11"
                    eventTimeFormat: {
                      hour: 'numeric',
                      meridiem: 'short',
                      hour12: true
                    },
                    slotMinTime: "06:00:00",
                    slotMaxTime: "24:00:00"
                },
                timeGridDay: { // Applies to the day view
                    titleFormat: { month: 'long', day: 'numeric' }, // "May 11"
                    slotMinTime: "06:00:00",
                    slotMaxTime: "24:00:00"
                }
            }}
          />
      </div>
  );
}

export default CalendarView;
