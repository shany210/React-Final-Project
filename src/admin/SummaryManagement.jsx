import React, { useState, useEffect } from "react";
import "../styles/SummaryManagement.css";
import { supabase } from "../supabase/supabaseClient";
import AdminSidebar from "./AdminSidebar";

export default function AdminPanel() {
  const [summaries, setSummaries] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    fetchSummaries();
  }, []);

  const fetchSummaries = async () => {
    const { data, error } = await supabase.from("summaries").select("*");
    if (!error) setSummaries(data);
  };

  const handleSummaryStatusChange = async (id, newStatus) => {
    const { error } = await supabase.from("summaries").update({ status: newStatus }).eq("id", id);
    if (!error) {
      setSummaries((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
      );
    }
  };

  return (
    <div className="admin-wrapper">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="admin-panel">
        <h2 className="panel-title">Summary list</h2>
        <table className="summary-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Course</th>
              <th>Summarized by</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {summaries.map((s) => (
              <tr key={s.id}>
                <td>{s.title}</td>
                <td>{s.course || "Course name"}</td>
                <td>{s.author}</td>
                <td>
                  <select
                    value={s.status || "Awaiting"}
                    onChange={(e) => handleSummaryStatusChange(s.id, e.target.value)}
                    className={`status-select status-${(s.status || "Awaiting").toLowerCase()}`}
                  >
                    <option value="Approved">Approved</option>
                    <option value="Awaiting">Awaiting</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td><a href="#">Edit</a> | <a href="#">Delete</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}