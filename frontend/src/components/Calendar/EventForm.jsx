import React, { useState, useEffect } from 'react';
import '../../styles/CSS/CalendarFormModal.css'

function EventForm({ isOpen, onClose, onSubmit, initialDate, initialStartTime, initialEndTime }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(initialDate || '');
    const [startTime, setStartTime] = useState(initialStartTime || '');
    const [endTime, setEndTime] = useState(initialEndTime || '');
    const [allDay, setAllDay] = useState(false);

    useEffect(() => {
        setDate(initialDate);
        setStartTime(initialStartTime); // Updated: initialStartTime
        setEndTime(initialEndTime); // Updated: initialEndTime
    }, [initialDate, initialStartTime, initialEndTime]);
    
    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        let formattedHours = parseInt(hours);
        let formattedMinutes = parseInt(minutes);
    
        // Adjust hours for PM times
        if (hours.includes('PM') && formattedHours !== 12) {
            formattedHours += 12;
        }
    
        // Adjust hours for midnight
        if (hours.includes('AM') && formattedHours === 12) {
            formattedHours = 0;
        }
    
        // Pad single-digit hours and minutes with leading zeros
        formattedHours = formattedHours.toString().padStart(2, '0');
        formattedMinutes = formattedMinutes.toString().padStart(2, '0');
    
        const formattedTime = `${formattedHours}:${formattedMinutes}`;
        return formattedTime;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Format start and end times
        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);
        
        let eventData;
        if (allDay) {
            // For all-day events, set start and end times to null
            eventData = {
                title,
                date,
                allDay: true,
                startTime: null,
                endTime: null
            };
        } else {
            // For events with specified times, include start and end times
            eventData = {
              title,
              date,
              allDay: false,
              startTime: formattedStartTime,
              endTime: formattedEndTime
              };
        }
        console.log("Event Data:", eventData);
        onSubmit(eventData);
        onClose(); // Close modal after submission
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <h2>Add New Event</h2>
                    <label>
                        Event Title:
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
                    </label>
                    <label>
                        Date:
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                    </label>
                    <label>
                        Start Time:
                        <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required />
                    </label>
                    <label>
                        End Time:
                        <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} required />
                    </label>
                    <label>
                        All Day:
                        <input type="checkbox" checked={allDay} onChange={e => setAllDay(e.target.checked)} />
                    </label>
                    <div className="modal-actions">
                        <button type="submit">Add Event</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EventForm;