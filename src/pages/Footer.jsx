// src/Footer.js
import React from 'react';
import './Footer.css'; // Import the CSS file for styling

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {currentYear} All rights reserved by Shubham Vishwakarma</p>
    </footer>
  );
}

export default Footer;