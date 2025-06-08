import React, { useEffect, useState } from "react";
import "../styles/AdminUserManagement.css";
import { supabase } from "../supabase/supabaseClient";
import AdminSidebar from "./AdminSidebar";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users_profiles").select("*");
    if (!error) setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdate = async (id, field, value) => {
    const { error } = await supabase.from("users_profiles").update({ [field]: value }).eq("id", id);
    if (!error) {
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, [field]: value } : u))
      );
    }
  };

  return (
    <div className="admin-wrapper">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="admin-user-panel">
        <h2 className="panel-title">User list</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className={u.status === "Inactive" ? "inactive" : ""}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <select value={u.role} onChange={(e) => handleUpdate(u.id, "role", e.target.value)}>
                    <option value="Admin">Admin</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Student">Student</option>
                  </select>
                </td>
                <td>
                  <select value={u.status} onChange={(e) => handleUpdate(u.id, "status", e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
                <td>
                  <a href="#">Edit</a> | <a href="#">Delete</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
