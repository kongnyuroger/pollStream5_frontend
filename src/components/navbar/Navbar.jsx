import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <NavLink to="/" className="navbar-brand">
          PollPulse
        </NavLink>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/host"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Host
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/participant"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Participant
            </NavLink>
          </li>
        </ul>
        <div className="navbar-actions">
          {!token && (
            <button className="action-button" onClick={() => navigate('/login')}>
              Login
            </button>
          )}
          {!token && (
            <button className="action-button" onClick={() => navigate('/register')}>
              Register
            </button>
          )}
          {token && <span className="small">Signed in</span>}
          {token && <button className="action-button" onClick={logout}>Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;