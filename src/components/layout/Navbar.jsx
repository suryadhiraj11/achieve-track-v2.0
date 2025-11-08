import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!currentUser) return null; // hide navbar for guests

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <h1
          className="nav-logo"
          onClick={() => navigate("/explore")}
          style={{ cursor: "pointer" }}
        >
          Achieve<span>Track</span>
        </h1>

        {/* Navigation Links */}
        <div className="nav-links">
          <NavLink to="/explore" className="nav-item">
            <i className="fa-solid fa-compass"></i> Explore
          </NavLink>

          <NavLink to="/achievements" className="nav-item">
            <i className="fa-solid fa-trophy"></i> My Achievements
          </NavLink>

          {/* ✅ Progress Tab Added (matches your design) */}
          <NavLink
            to="/progress"
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <i className="fa-solid fa-chart-line"></i> Progress
          </NavLink>

          <NavLink to="/profile" className="nav-item">
            <i className="fa-solid fa-user"></i> Profile
          </NavLink>

          <button className="nav-logout" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
