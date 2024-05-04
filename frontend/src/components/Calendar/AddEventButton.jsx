import React from 'react';

function AddEventButton({ onClick }) {
    return (
        <button onClick={onClick} className="add-event-button">
            +
        </button>
    );
}

export default AddEventButton;
