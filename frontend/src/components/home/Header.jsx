import React from 'react';

function Header() {
  return (
    <header className="home-header">
      <img src={require('../../assets/homepage_icons/app-icon.png')} alt={"Logo of two hands held up as though focusing on something in front of them."} />
      <h1>Ease</h1>
      <p>Enhancing focus and organization for ADHD minds</p>
    </header>
  );
}

export default Header;
