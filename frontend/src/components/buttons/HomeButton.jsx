import React from 'react';
import "../../styles/CSS/HomeButton.css";

const HomeButton = () => {

    return (
        <a href={'/'} className="home-button">
            <img src={require("../../assets/homepage_icons/back.png")} alt="back"/>
        </a>
    );
};

export default HomeButton;