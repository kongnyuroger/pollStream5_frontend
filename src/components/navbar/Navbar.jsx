import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    

  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
          PollPulse
        </NavLink>

        {/* Mobile toggle */}
        <button className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? "Close" : "Menu"}
        </button>

        {/* Nav links */}
        <ul className={`navbar-nav ${isMenuOpen ? "open" : "close"}`}>
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/host"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              Host
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/participant"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              Participant
            </NavLink>
          </li>
        </ul>

        {/* Overlay */}
        {isMenuOpen && (
          <div className="navbar-backdrop" onClick={closeMenu}></div>
        )}

        {/* Actions */}
        <div className="navbar-actions">
          {!token && (
            <button
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
          {!token && (
            <button
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          )}
          {token && (
            <button  onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
