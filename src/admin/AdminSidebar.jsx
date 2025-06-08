import React from "react";
import "../styles/AdminSidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import iconUsers from "../assets/user.svg";
import iconSummaries from "../assets/checkmark2.svg";
import iconDashboard from "../assets/dashboard.svg";
import iconArrow from "../assets/back.svg";

export default function AdminSidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  return (
    <div className={`admin-sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-header">
        <div className="logo-wrapper">
          <span className="admin-logo-text">StudySync</span>
          <span className="admin-console">Admin console</span>
        </div>
        <button onClick={toggleSidebar} className="toggle-btn">
          <img
            src={iconArrow}
            alt="Toggle Sidebar"
            className={`toggle-icon ${!isOpen ? "rotated" : ""}`}
          />
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/admin"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          end
        >
          <img src={iconDashboard} alt="Dashboard" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <img src={iconUsers} alt="User Management" />
          <span>User management</span>
        </NavLink>

        <NavLink
          to="/admin/summaries"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <img src={iconSummaries} alt="Summary Management" />
          <span>Summary management</span>
        </NavLink>
      </nav>

      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}



