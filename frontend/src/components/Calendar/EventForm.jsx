import React, { useState } from 'react';

function EventFormModal({ isOpen, onClose, onSubmit }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, date });
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
                    <div className="modal-actions">
                        <button type="submit">Add Event</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EventFormModal;