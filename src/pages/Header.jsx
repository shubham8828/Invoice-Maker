import React from 'react';
import './Header.css'; 
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to={'/'}>Home</Link> 
        </li>
        <li className="navbar-item">
        <Link to={'/about'}>About</Link> 
        </li>
        <li className="navbar-item">
        <Link to={'/contact'}>Contact</Link> 
        </li>
      </ul>
      <Link to={'/login'} >
        <button className="login-button">Login</button>
      </Link>
    </nav>
  );
}

export default Header;