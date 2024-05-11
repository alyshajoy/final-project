import React, { useState, useEffect } from "react";
import CalendarView from "../components/Calendar/CalendarView";
import AddEventButton from "../components/Calendar/AddEventButton";
import EventForm from "../components/Calendar/EventForm";
import HomeButton from "../components/buttons/HomeButton";
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
        setEvents(data.map(event => ({
          title: event.title,
          start: new Date(event.start_time),
          end: new Date(event.end_time),
          id: event.id
        })));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  console.log("events:", events);

  const handleAddEvent = async (eventData) => {
    const { title, date, startTime, endTime, allDay } = eventData;
    if (allDay) {
      // If it's an all-day event, set start and end times to null
      const newEvent = { title, date, allDay: true };
      setEvents([...events, newEvent]); // Add new event to the existing events
    } else {
      // If it's not an all-day event, combine date and time for start and end
      const start = `${date}T${startTime}`; // Combine date and start time
      const end = `${date}T${endTime}`; // Combine date and end time
  
      const newEvent = { title, date, start, end };
      setEvents([...events, newEvent]); // Add new event to the existing events

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
    setStartTime(event.start.toISOString().split('T')[1].slice(0, 5));
    setEndTime(event.end.toISOString().split('T')[1].slice(0, 5));
    setAllDay(event.allDay);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async (eventId) => {
    console.log("EVENT ID:", eventId);
    // Call your backend API to delete the event
    const response = await fetch(`http://localhost:3001/api/calendar/events/${eventId}`, { method: 'DELETE' });
    if (response.ok) {
      // Remove the event from the state or re-fetch events
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      // Log the updated state here
      console.log("EVENTS:", events);
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
        initialAllDay={allDay}
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
          setSelectedDate={setSelectedDate}
          setSelectedStartTime={setSelectedStartTime}
          setSelectedEndTime={setSelectedEndTime}
          onDoubleClickEvent={handleDoubleClickEvent}
        />
      </div>
    </div>
  );
};

export default Calendar;