import React, { useEffect, useState, useContext } from "react";
import "../styles/Dashboard.css";
import Sidebar from "./Sidebar";
import iconOpen from "../assets/hour-glass.svg";
import iconComplete from "../assets/checkmark.svg";
import iconSummary from "../assets/website.svg";
import logo from "../assets/Logo.png";
import { UserContext } from "./UserContext";
import { supabase } from "../supabase/supabaseClient";

export default function Dashboard() {
  const { profile } = useContext(UserContext);

  const [tasks, setTasks] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchTasksAndSummaries = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) return;

      const { data: tasksData, error: tasksError } = await supabase
        .from("tasks")
        .select("name, course, due, priority, completed")
        .eq("user_id", user.id)
        .order("due", { ascending: true });

      const { data: summariesData, error: summariesError } = await supabase
        .from("summaries")
        .select("title, author, date, stars, file_url")
        .order("date", { ascending: false });

      if (!tasksError) setTasks(tasksData || []);
      if (!summariesError) setSummaries(summariesData || []);
    };

    fetchTasksAndSummaries();
  }, []);

  const openTasks = tasks.filter((task) => !task.completed).length;
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
            <span>{profile?.full_name?.split(" ")[0] || "User"}</span>
            <img
              src={
                profile?.profile_picture ||
                "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              }
              alt="User Profile"
              className="user-icon"
            />
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
                    <td>{new Date(task.due).toLocaleDateString()}</td>
                    <td>{task.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="dashboard-section">
            <h2>Summary Library</h2>
            <div className="summary-cards">
              {summaries.map((summary, i) => (
                <div className="summary-card" key={i}>
                 <div className="stars">
                 {Array.from({ length: 5 }).map((_, index) => (
                 <span
                 key={index}
                 style={{
                 color: index < parseInt(summary.stars || 0) ? "var(--star-yellow)" : "#ccc",
            }}
                  >
                  ★
                 </span>
      ))}
                   </div>
                  <h3>{summary.title}</h3>
                  <p className="approved">Approved by: AI</p>
                  <p className="info">
                    {summary.author}
                    <br />
                    {summary.date}
                  </p>
                  {summary.file_url && (
                    <a
                      href={summary.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="summary-link"
                    >
                      View File
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


