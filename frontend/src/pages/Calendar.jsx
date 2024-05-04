import React from "react";
import CalendarView from "../components/Calendar/CalendarView";
import AddEventButton from "../components/Calendar/AddEventButton";

const Calendar = () => {
  return (
    <div>
      <h1>I am the Calendar page</h1>
      <AddEventButton />
      <CalendarView />
    </div>
  );
};

export default Calendar;