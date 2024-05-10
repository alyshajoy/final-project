import React, { useState } from "react";
import CalendarView from "../components/Calendar/CalendarView";
import AddEventButton from "../components/Calendar/AddEventButton";
import EventForm from "../components/Calendar/EventForm";

const Calendar = () => {

  const [events, setEvents] = useState([]); // State to store events
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedDate, setSelectedDate] = useState(null); // Date selected in CalendarView
  const [selectedStartTime, setSelectedStartTime] = useState(null); // Start time selected in CalendarView
  const [selectedEndTime, setSelectedEndTime] = useState(null); // End time selected in CalendarView

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
      <h1>I am the Calendar page</h1>
      <AddEventButton onClick={handleOpenModal}/>
      <EventForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEvent}
        initialDate={selectedDate}
        initialStartTime={selectedStartTime}
        initialEndTime={selectedEndTime}
      />
      <CalendarView
        events={events}
        setSelectedDate={setSelectedDate}
        setSelectedStartTime={setSelectedStartTime}
        setSelectedEndTime={setSelectedEndTime}
      />
    </div>
  );
};

export default Calendar;