import React, { useEffect, useState } from "react";
import "../styles/AdminDashboard.css";
import { supabase } from "../supabase/supabaseClient";
import AdminSidebar from "./AdminSidebar";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const [stats, setStats] = useState({
    totalSummaries: 0,
    approvedSummaries: 0,
    rejectedSummaries: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { count: totalSummaries } = await supabase
        .from("summaries")
        .select("*", { count: "exact", head: true });

      const { count: approvedSummaries } = await supabase
        .from("summaries")
        .select("*", { count: "exact", head: true })
        .eq("status", "Approved");

      const { count: rejectedSummaries } = await supabase
        .from("summaries")
        .select("*", { count: "exact", head: true })
        .eq("status", "Rejected");

      const { count: totalUsers } = await supabase
        .from("users_profiles")
        .select("*", { count: "exact", head: true });

      setStats({
        totalSummaries,
        approvedSummaries,
        rejectedSummaries,
        totalUsers,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-wrapper">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`admin-dashboard ${isSidebarOpen ? "" : "expanded"}`}>
        <h2>Admin Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Summaries</h3>
            <p>{stats.totalSummaries}</p>
          </div>
          <div className="stat-card">
            <h3>Approved</h3>
            <p>{stats.approvedSummaries}</p>
          </div>
          <div className="stat-card">
            <h3>Rejected</h3>
            <p>{stats.rejectedSummaries}</p>
          </div>
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


