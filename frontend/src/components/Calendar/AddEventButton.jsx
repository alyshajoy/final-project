import React from 'react';

function AddEventButton({ onClick }) {
    return (
        <img onClick={onClick} className="add-event-button" src='/images/add-to-cal.png' alt="add to cal"></img>
    );
}

export default AddEventButton;
