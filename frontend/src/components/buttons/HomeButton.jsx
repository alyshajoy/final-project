import React from 'react';
import "../../styles/CSS/HomeButton.css";

const HomeButton = () => {

    return (
        <div>
            <a href={'/'} className="home-button">
            <img src={require("../../assets/homepage_icons/back.png")} alt="back"/>
            </a>
            <div className='gray-app-icon'>
                <img src={require("../../assets/homepage_icons/gray app icon.png")} alt="app-icon"/>
            </div>
        </div>
    );
};

export default HomeButton;