// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      {isLoggedIn && (
        <>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <button onClick={onLogout} className="nav-button">Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
