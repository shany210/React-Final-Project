import React, { useState, useContext, useEffect } from "react";
import "../styles/SummaryLibrary.css";
import Sidebar from "./Sidebar";
import searchIcon from "../assets/magnifying-glass.svg";
import { supabase } from "../supabase/supabaseClient";
import { UserContext } from "./UserContext";

export default function SummaryLibrary() {
  const [summaries, setSummaries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("new");
  const { profile } = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    date: "",
    stars: "5",
    file: null,
  });

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files?.[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchSummaries = async () => {
    const { data, error } = await supabase
      .from("summaries")
      .select("*");

    if (!error && data) {
      setSummaries(data);
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  const uploadSummaryToSupabase = async () => {
    const { title, author, date, stars, file } = formData;

    if (!title || !author || !date || !file) {
      alert("Please fill out all fields and attach a file.");
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("You must be signed in to upload a summary.");
      return;
    }

    const cleanName = file.name.replace(/\s+/g, "_").replace(/[^\w.\-]/g, "");
    const fileName = `${Date.now()}_${cleanName}`;

    const { error: uploadError } = await supabase.storage
      .from("summary-files")
      .upload(fileName, file);

    if (uploadError) {
      alert("File upload failed: " + uploadError.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("summary-files")
      .getPublicUrl(fileName);

    const file_url = publicUrlData?.publicUrl;

    const { error: insertError } = await supabase.from("summaries").insert([
      {
        title,
        author,
        date,
        stars,
        file_url,
        user_id: user.id,
      },
    ]);

    if (insertError) {
      alert("Error saving summary: " + insertError.message);
    } else {
      alert("Summary uploaded successfully!");
      setFormData({ title: "", author: "", date: "", stars: "5", file: null });
      setShowForm(false);
      document.body.classList.remove("modal-open");
      fetchSummaries();
    }
  };

  const filteredSummaries = summaries
    .filter((summary) =>
      summary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === "rating") {
        return parseInt(b.stars || 0) - parseInt(a.stars || 0);
      } else if (filter === "popular") {
        return (b.views || 0) - (a.views || 0);
      } else {
        return new Date(b.created_at) - new Date(a.created_at);
      }
    });

  return (
    <div className="summary-library-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`summary-main ${isSidebarOpen ? "" : "collapsed"}`}>
        <div className="header-bar">
          <div className="logo-area">
            <h2>Summary Library</h2>
          </div>
          <div className="user-area">
            <span>{profile?.full_name?.split(" ")[0] || "User"}</span>
            <img
              src={
                profile?.profile_picture ||
                "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              }
              alt="User"
              className="user-icon"
            />
          </div>
        </div>

        <div className="summary-library-content">
          <div className="summary-controls">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <img src={searchIcon} alt="Search" className="search-icon" />
            </div>
            <div className="filter-buttons">
              <button
                className={filter === "new" ? "active" : ""}
                onClick={() => setFilter("new")}
              >
                {filter === "new" ? "✓ " : ""}New
              </button>
              <button
                className={filter === "rating" ? "active" : ""}
                onClick={() => setFilter("rating")}
              >
                {filter === "rating" ? "✓ " : ""}Rating
              </button>
              <button
                className={filter === "popular" ? "active" : ""}
                onClick={() => setFilter("popular")}
              >
                {filter === "popular" ? "✓ " : ""}Popular
              </button>
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
            {filteredSummaries.map((summary, i) => (
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
        </div>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal-panel centered">
              <h2 className="modal-title" style={{ textAlign: "center", fontSize: "1.5rem" }}>
                Add New Summary
              </h2>
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

              <label className="upload-label" style={{ textAlign: "center", fontSize: "1.1rem" }}>
                Upload Summary File
              </label>

              <input
                type="file"
                name="file"
                accept=".pdf,.doc,.docx"
                onChange={handleInputChange}
              />

              {formData.file && (
                <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                  Selected file: <strong>{formData.file.name}</strong>
                </p>
              )}

              <div className="button-row">
                <button onClick={uploadSummaryToSupabase}>Add</button>
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



