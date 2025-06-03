import React from "react";
import "../styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import iconDashboard from "../assets/dashboard.svg";
import iconTasks from "../assets/checkmark2.svg";
import iconSummaries from "../assets/paper.svg";
import iconSettings from "../assets/settings.svg";
import iconQuestion from "../assets/question.svg";
import iconArrow from "../assets/back.svg";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-header">
        <button onClick={toggleSidebar} className="toggle-btn">
          <img src={iconArrow} alt="Toggle Sidebar" />
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="nav-link">
          <img src={iconDashboard} alt="Dashboard" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/summaries" className="nav-link">
          <img src={iconSummaries} alt="Summaries" />
          <span>Summaries</span>
        </NavLink>
        <NavLink to="/tasks" className="nav-link">
          <img src={iconTasks} alt="Tasks" />
          <span>Tasks</span>
        </NavLink>
        <NavLink to="/settings" className="nav-link">
          <img src={iconSettings} alt="Settings" />
          <span>Settings</span>
        </NavLink>
        <NavLink to="/help" className="nav-link">
          <img src={iconQuestion} alt="Help" />
          <span>Help</span>
        </NavLink>
      </nav>
    </div>
  );
}
