import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        Navbar
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        onClick={handleClick}
        aria-controls="navbarSupportedContent"
        aria-expanded={collapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse${collapsed ? " show" : ""}`}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/routes">
              All Routes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/addRoute">
              Add Route
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/datapoints">
              All DataPoints
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/addPoint">
              Add DataPoint
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
