import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/Settings.css";

export default function Settings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profilePicture: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? URL.createObjectURL(files[0]) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved data:", formData);
  };

  return (
    <div className="settings-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`settings-main ${isSidebarOpen ? "" : "collapsed"}`}>
        <div className="header-bar">
          <div className="logo-area">
            <h2>Settings</h2>
          </div>
          <div className="user-area">
            <span>Noam Shavit</span>
            <img src={formData.profilePicture} alt="User" className="user-icon" />
          </div>
        </div>

        <div className="settings-content">
          <form onSubmit={handleSubmit}>
            <div className="profile-section">
              <label htmlFor="profilePictureInput" className="profile-picture-wrapper">
                <img src={formData.profilePicture} alt="Profile" className="profile-pic" />
                <span className="camera-icon">📷</span>
              </label>
              <input
                type="file"
                id="profilePictureInput"
                name="profilePicture"
                accept="image/*"
                onChange={handleChange}
                hidden
              />
              <h3 className="profile-name">
                {formData.firstName || "Noam"} {formData.lastName || "Shavit"}
              </h3>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>First Name</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Value" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Value" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Value" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Value" />
              </div>
              <div className="form-group password-group">
                <label>New Password</label>
                <div className="input-with-icon">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Value"
                  />
                  <span onClick={() => setShowPassword(!showPassword)} className="toggle-eye">👁️</span>
                </div>
              </div>
              <div className="form-group password-group">
                <label>Confirm Password</label>
                <div className="input-with-icon">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Value"
                  />
                  <span onClick={() => setShowConfirm(!showConfirm)} className="toggle-eye">👁️</span>
                </div>
              </div>
            </div>

            <button type="submit" className="save-btn">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}