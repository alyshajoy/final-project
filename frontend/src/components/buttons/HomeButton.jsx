import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');  // Navigate to the home route
    };

    return (
        <button onClick={goToHome}>Home</button>
    );
};

export default HomeButton;