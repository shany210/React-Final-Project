import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TaskManagement.css";
import Sidebar from "./Sidebar";
import searchIcon from "../assets/magnifying-glass.svg";
import { UserContext } from "./UserContext";
import { supabase } from "../supabase/supabaseClient";

export default function TaskManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    due: "",
    priority: "High",
  });

  const { profile } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("id, name, course, due, priority, completed")
      .eq("user_id", user.id)
      .order("due", { ascending: true });

    if (!error && data) {
      setTasks(data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async () => {
    if (formData.name && formData.course && formData.due && formData.priority) {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("You must be signed in to add a task.");
        return;
      }

      const { error: insertError } = await supabase.from("tasks").insert([
        {
          name: formData.name,
          course: formData.course,
          due: formData.due,
          priority: formData.priority,
          completed: false,
          user_id: user.id,
        },
      ]);

      if (insertError) {
        alert("Error adding task: " + insertError.message);
        return;
      }

      setFormData({ name: "", course: "", due: "", priority: "High" });
      setShowForm(false);
      document.body.classList.remove("modal-open");
      fetchTasks();
    }
  };

  const handleToggleComplete = async (taskId, currentStatus) => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !currentStatus })
      .eq("id", taskId);

    if (!error) {
      fetchTasks();
    }
  };

  const filteredTasks = filter === "All" ? tasks : tasks.filter(t => t.priority === filter);

  return (
    <div className="task-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`task-main ${isSidebarOpen ? "" : "collapsed"}`}>
        <div className="header-bar">
          <div className="logo-area">
            <h2>Task Management</h2>
          </div>
          <div className="user-area">
            <span>{profile?.full_name?.split(" ")[0] || "User"}</span>
            <img
              src={profile?.profile_picture || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
              alt="User"
              className="user-icon"
            />
          </div>
        </div>

        <div className="task-content">
          <div className="task-controls">
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <img src={searchIcon} alt="Search" className="search-icon" />
            </div>
            <div className="task-filters">
              {["All", "High", "Medium", "Low"].map(level => (
                <button
                  key={level}
                  className={filter === level ? "active" : ""}
                  onClick={() => setFilter(level)}
                >
                  {level}
                </button>
              ))}
              <button className="add-task" onClick={() => {
                setShowForm(true);
                document.body.classList.add("modal-open");
              }}>+ Add Task</button>
            </div>
          </div>

          <div className="task-table-wrapper">
            <table className="task-table">
              <thead>
                <tr>
                  <th>Task name</th>
                  <th>Course</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task, i) => (
                  <tr key={i}>
                    <td>{task.name}</td>
                    <td>{task.course}</td>
                    <td>{task.due}</td>
                    <td>{task.priority}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id, task.completed)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showForm && (
            <div className="modal-overlay">
              <div className="modal-panel centered">
                <h3 className="modal-title">Add New Task</h3>
                <input type="text" name="name" placeholder="Task Title" value={formData.name} onChange={handleInputChange} />
                <input type="text" name="course" placeholder="Course Name" value={formData.course} onChange={handleInputChange} />
                <input type="date" name="due" value={formData.due} onChange={handleInputChange} />
                <select name="priority" value={formData.priority} onChange={handleInputChange}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <div className="button-row">
                  <button onClick={handleAddTask}>Add</button>
                  <button className="cancel-btn" onClick={() => {
                    setShowForm(false);
                    document.body.classList.remove("modal-open");
                  }}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
