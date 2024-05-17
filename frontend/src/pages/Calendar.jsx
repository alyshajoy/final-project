import React, { useState, useEffect } from "react";
import CalendarView from "../components/Calendar/CalendarView";
import AddEventButton from "../components/Calendar/AddEventButton";
import EventForm from "../components/Calendar/EventForm";
import HomeButton from "../components/buttons/HomeButton";
import Footer from "../components/home/Footer";
import '../styles/CSS/Calendar.css';

const Calendar = () => {

  const [events, setEvents] = useState([]); // State to store events
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedDate, setSelectedDate] = useState(null); // Date selected in CalendarView
  const [selectedStartTime, setSelectedStartTime] = useState(null); // Start time selected in CalendarView
  const [selectedEndTime, setSelectedEndTime] = useState(null); // End time selected in CalendarView
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [formMode, setFormMode] = useState('new');
  const [eventID, setEventID] = useState('');


  // Fetch events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/calendar/events', {
          method: 'GET',
          credentials: 'include'  // Include cookies
        });
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setEvents(data.map(event => {
          let res = {}
          if (event.all_day) {
            res = {
              id: event.id,
              title: event.title,
              start: new Date(event.start_time),
              allDay: true
            }
          } else {
            res = {
              title: event.title,
              start: new Date(event.start_time),
              end: new Date(event.end_time),
              id: event.id,
              allDay: event.allDay
            }
          }
          return res;
      }));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);



  // function to convert times to UTC
  const toUTC = (date, time) => {
    const localDate = new Date(`${date}T${time}`);
    return new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000)).toISOString();
  };
  


  const handleAddEvent = async (eventData) => {
    const { title, date, startTime, endTime, allDay, id } = eventData;
    if (allDay) {

      const start = date;
      const newEvent = { title, start, allDay: true };
      setEvents([...events, newEvent]); // Add new event to the existing events

      try {
        const response = await fetch('http://localhost:3001/api/calendar/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newEvent),
            credentials: 'include' // include cookies
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        console.log("Event added successfully:", result);
        window.location.reload();
      } catch (error) {
        console.error("Error adding event:", error);
      }

    } else {
      // If it's not an all-day event, combine date and time for start and end
      const start = toUTC(date, startTime); // Combine date and start time
      const end = toUTC(date, endTime); // Combine date and end time

      if (formMode === 'edit' && events.length > 0) {
        // If in edit mode, update the existing event instead of adding a new one
        setEvents(events.map(event => {
          if (event.id === eventID) {
            console.log("EVENT:", event);
            return { ...event, title, date, start, end };
          }
          return event;
          
        }));
  
        try {
          const response = await fetch(`http://localhost:3001/api/calendar/events/update/${title}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              title,
              date,
              start,
              end,
              allDay
            }),
            credentials: 'include' // include cookies
          });
  
          if (!response.ok) throw new Error('Network response was not ok');
          const result = await response.json();
          console.log("Event updated successfully:", result);
          window.location.reload();
        } catch (error) {
          console.error("Error updating event:", error);
        }
      } else {
        // If in new mode, add a new event to the existing events
        const newEvent = { title, date, start, end };
        setEvents([...events, newEvent]);
        
        console.log("Event data:", {
          title,
          date,
          start,
          end
        });
  
        try {
          const response = await fetch('http://localhost:3001/api/calendar/events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              title,
              date,
              start,
              end,
              allDay
            }),
            credentials: 'include' // include cookies
          });
  
          if (!response.ok) throw new Error('Network response was not ok');
          const result = await response.json();
          console.log("Event added successfully:", result);
        } catch (error) {
          console.error("Error adding event:", error);
        }
      }
    }
  
    setIsModalOpen(false); // Close modal after adding event
  };
  
  
  const handleOpenModalForNewEvent = () => {
    // Optionally set only date and time or leave blank for completely new event
    setFormMode('new');
    setTitle('');
    setDate(selectedDate);
    setStartTime(selectedStartTime || '12:00');  // Default start time if none selected
    setEndTime(selectedEndTime || '13:00');  // Default end time if none selected
    setAllDay(false);
    setIsModalOpen(true);
  };

  const handleDoubleClickEvent = (event) => {
    setFormMode('edit');
    setTitle(event.title);
    setEventID(event.id);
    setDate(event.startStr.split('T')[0]);

    if (!event.allDay) {
      if (event.start) {
        setStartTime(event.start.toISOString().split('T')[1].slice(0, 5));
      } else {
        setStartTime(''); // Set empty or a default time if necessary
      }
  
      if (event.end) {
        setEndTime(event.end.toISOString().split('T')[1].slice(0, 5));
      } else {
        setEndTime(''); // Set empty or a default time if necessary
      }
    } else {
      // Clear time fields for all-day events
      setStartTime('');
      setEndTime('');
    }

    setAllDay(event.allDay);
    setIsModalOpen(true);
  };
  
  const handleDeleteEvent = async (eventId) => {

  // Call backend API to delete the event
  const response = await fetch(`http://localhost:3001/api/calendar/events/delete/${eventId}`, { method: 'DELETE' });
    if (response.ok) {

      window.location.reload();

      setIsModalOpen(false); // Close the modal on successful deletion
    } else {
      console.error('Failed to delete the event');
    }
  };

  return (
    <div>
      <HomeButton />
      <h1>Calendar</h1>
      
      <EventForm 
        isOpen={isModalOpen}
        mode={formMode}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEvent}
        initialDate={selectedDate}
        initialStartTime={selectedStartTime}
        setSelectedStartTime={setSelectedStartTime}
        initialEndTime={selectedEndTime}
        setSelectedEndTime={setSelectedEndTime}
        allDay={allDay}
        setAllDay={setAllDay}
        title={title}
        setTitle={setTitle}
        date={date}
        setDate={setDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        onDelete={() => handleDeleteEvent(eventID)}
      />
      <div className="calendar-wrapper">
        <AddEventButton onClick={handleOpenModalForNewEvent}/>
        <CalendarView
          events={events}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setSelectedStartTime={setSelectedStartTime}
          setSelectedEndTime={setSelectedEndTime}
          onDoubleClickEvent={handleDoubleClickEvent}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Calendar;