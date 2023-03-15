import React, { useState } from "react";
import { NavLink } from "react-router-dom";

//import colors
import colors from "../css/Colors";

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: colors.primary }}>
      <NavLink className="navbar-brand" to="/" style={{ color: colors.secondary }}>
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
        <span className="navbar-toggler-icon" style={{ color: colors.secondary }}></span>
      </button>
      <div
        className={`collapse navbar-collapse${collapsed ? " show" : ""}`}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/routes" style={{ color: colors.secondary }}>
              All Routes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/addRoute" style={{ color: colors.secondary }}>
              Add Route
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/datapoints" style={{ color: colors.secondary }}>
              All DataPoints
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/addPoint" style={{ color: colors.secondary }}>
              Add DataPoint
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login" style={{ color: colors.secondary }}>
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register" style={{ color: colors.secondary }}>
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
