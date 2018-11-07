import React, { Component } from 'react';
import '../styles/header.css';
import logo from '../images/MarvelLogo.svg';

class Header extends Component {

  render() {
    return (
      <div className='header-container'>
        <img className='header-logo' src={logo} alt='logo'/>
      </div>
    );
  }
}

export default Header;
