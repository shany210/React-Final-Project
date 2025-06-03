import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import Sidebar from "./Sidebar";
import iconOpen from "../assets/hour-glass.svg";
import iconComplete from "../assets/checkmark.svg";
import iconSummary from "../assets/website.svg";
import iconUser from "../assets/user.svg";
import logo from "../assets/Logo.png";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedSummaries = JSON.parse(localStorage.getItem("summaries")) || [];
    setTasks(storedTasks);
    setSummaries(storedSummaries);
  }, []);

  const openTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const summariesViewed = summaries.length;

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="dashboard-main">
      
        <div className="header-bar">
          <div className="logo-area">
            <img src={logo} alt="StudySync Logo" className="logo-img" />
          </div>
          <div className="user-area">
            <img src={iconUser} alt="User Profile" className="user-icon" />
          </div>
        </div>

        
        <div className="dashboard-content">
          <div className="dashboard-stats">
            <div className="stat-box">
              <img src={iconOpen} alt="Open Tasks" className="stat-icon" />
              <strong>{openTasks}</strong> Open Tasks
            </div>
            <div className="stat-box">
              <img src={iconComplete} alt="Completed Tasks" className="stat-icon" />
              <strong>{completedTasks}</strong> Completed This Week
            </div>
            <div className="stat-box">
              <img src={iconSummary} alt="Summaries Viewed" className="stat-icon" />
              <strong>{summariesViewed}</strong> Summaries Viewed This Week
            </div>
          </div>

          <section className="dashboard-section">
            <h2>Upcoming Tasks</h2>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Task name</th>
                  <th>Course</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.name}</td>
                    <td>{task.course}</td>
                    <td>{task.date}</td>
                    <td>
                      <input type="checkbox" checked={task.completed} readOnly />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="dashboard-section">
            <h2>Summary Library</h2>
            <div className="summary-filters">
              <input type="text" placeholder="Search" />
              <button className="active">✓ New</button>
              <button>Rating</button>
              <button>Popular</button>
            </div>

            <div className="summary-cards">
              {summaries.map((summary, i) => (
                <div className="summary-card" key={i}>
                  <div className="stars">
                    {"⭐".repeat(summary.stars || 4)}
                    {"☆".repeat(5 - (summary.stars || 4))}
                  </div>
                  <h3>{summary.title}</h3>
                  <p className="approved">Approved by: {summary.approvedBy || "AI"}</p>
                  <p className="info">
                    {summary.author}
                    <br />
                    {summary.date}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
