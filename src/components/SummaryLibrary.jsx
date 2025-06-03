import React, { useState } from "react";
import "../styles/SummaryLibrary.css";
import Sidebar from "./Sidebar";
import searchIcon from "../assets/magnifying-glass.svg";

export default function SummaryLibrary() {
  const [summaries, setSummaries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    date: "",
    stars: "5",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAddSummary = () => {
    if (formData.title && formData.author && formData.date && formData.file) {
      setSummaries((prev) => [...prev, formData]);
      setFormData({ title: "", author: "", date: "", stars: "5", file: null });
      setShowForm(false);
      document.body.classList.remove("modal-open");
    }
  };

  return (
    <div className="summary-library-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`summary-main ${isSidebarOpen ? "" : "collapsed"}`}>
        <div className="header-bar">
          <div className="logo-area">
            <h2>Summary Library</h2>
          </div>
          <div className="user-area">
            <span>Noam Shavit</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt="User"
              className="user-icon"
            />
          </div>
        </div>

        <div className="summary-library-content">
          <div className="summary-controls">
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <img src={searchIcon} alt="Search" className="search-icon" />
            </div>
            <div className="filter-buttons">
              <button className="active">✓ New</button>
              <button>Rating</button>
              <button>Popular</button>
              <button
                className="add-summary"
                onClick={() => {
                  setShowForm(true);
                  document.body.classList.add("modal-open");
                }}
              >
                + Add Summary
              </button>
            </div>
          </div>

          <div className="summary-grid">
            {summaries.map((summary, i) => (
              <div className="summary-card" key={i}>
                <div className="stars">
                  {"⭐".repeat(parseInt(summary.stars || 4))}
                  {"☆".repeat(5 - parseInt(summary.stars || 4))}
                </div>
                <h3>{summary.title}</h3>
                <p className="approved">Approved by: AI</p>
                <p className="info">
                  {summary.author}
                  <br />
                  {summary.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal-panel centered">
              <h2 className="modal-title" style={{ textAlign: "center", fontSize: "1.5rem" }}>Add New Summary</h2>
              <input
                type="text"
                name="title"
                placeholder="Summary Title"
                value={formData.title}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="author"
                placeholder="Author Name"
                value={formData.author}
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
              <select name="stars" value={formData.stars} onChange={handleInputChange}>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              <label className="upload-label" style={{ textAlign: "center", fontSize: "1.1rem" }}>Upload Summary File</label>
              <input
                type="file"
                name="file"
                accept=".pdf,.doc,.docx"
                onChange={handleInputChange}
              />
              <div className="button-row">
                <button onClick={handleAddSummary}>Add</button>
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setShowForm(false);
                    document.body.classList.remove("modal-open");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
