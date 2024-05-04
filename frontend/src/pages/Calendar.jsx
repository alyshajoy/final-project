import React, { useState } from "react";
import CalendarView from "../components/Calendar/CalendarView";
import AddEventButton from "../components/Calendar/AddEventButton";
import EventForm from "../components/Calendar/EventForm";

const Calendar = () => {

  const [events, setEvents] = useState([]); // State to store events
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleAddEvent = (eventData) => {
    const { title, date, startTime, endTime } = eventData;
    const start = `${date}T${startTime}:00`; // Combine date and start time
    const end = `${date}T${endTime}:00`; // Combine date and end time
    const newEvent = { title, start, end };
    setEvents([...events, newEvent]); // Add new event to the existing events
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
      />
      <CalendarView events={events}/>
    </div>
  );
};

export default Calendar;