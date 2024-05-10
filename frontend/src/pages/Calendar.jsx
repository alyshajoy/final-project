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
          end: new Date(event.end_time)
        })));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = async (eventData) => {
    const { title, date, startTime, endTime } = eventData;
    const start_time = `${date}T${startTime}:00`; // Combine date and start time
    const end_time = `${date}T${endTime}:00`; // Combine date and end time

    const newEvent = { title, date, start_time, end_time };
    setEvents([...events, newEvent]); // Add new event to the existing events

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
              start_time, 
              end_time
          }),
          credentials: 'include'  // include cookies
      });

    if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      console.log("Event added successfully:", result);
    } catch (error) {
      console.error("Error adding event:", error);
  }

    setIsModalOpen(false); // Close modal after adding event
};


  const handleOpenModal = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  return (
    <div>
      <HomeButton />
      <h1>Calendar</h1>
      
      <EventForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEvent}
        initialDate={selectedDate}
        initialStartTime={selectedStartTime}
        initialEndTime={selectedEndTime}
      />
      <div className="calendar-wrapper">
        <AddEventButton onClick={handleOpenModal}/>
        <CalendarView
          events={events}
          setSelectedDate={setSelectedDate}
          setSelectedStartTime={setSelectedStartTime}
          setSelectedEndTime={setSelectedEndTime}
        />
      </div>
    </div>
  );
};

export default Calendar;