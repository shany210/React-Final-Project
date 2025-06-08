import React, { useState, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/Settings.css";
import { supabase } from "../supabase/supabaseClient";
import { UserContext } from "./UserContext";

export default function Settings() {
  const { user, profile, setProfile } = useContext(UserContext);

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

  const uploadImageToStorage = async (file) => {
    if (!file || !user) {
      console.warn("Missing file or user info.");
      return null;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase
      .storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert("Error uploading image: " + uploadError.message);
      console.error(uploadError);
      return null;
    }

    const { data: publicUrlData, error: urlError } = supabase
      .storage
      .from("avatars")
      .getPublicUrl(filePath);

    if (urlError) {
      console.error("Error getting public URL:", urlError.message);
      return null;
    }

    return publicUrlData?.publicUrl || null;
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePicture" && files.length > 0) {
      const uploadedUrl = await uploadImageToStorage(files[0]);
      if (uploadedUrl) {
        setFormData(prev => ({ ...prev, profilePicture: uploadedUrl }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase
      .from("users_profiles")
      .upsert([{
        id: user.id,
        full_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        profile_picture: formData.profilePicture,
      }]);

    if (error) {
      alert("Error saving profile: " + error.message);
    } else {
      alert("Profile saved successfully!");
      setProfile({
        ...profile,
        full_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        profile_picture: formData.profilePicture,
      });
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("users_profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setProfile(data);
        setFormData({
          firstName: data.full_name?.split(" ")[0] || "",
          lastName: data.full_name?.split(" ")[1] || "",
          email: data.email || "",
          phone: data.phone || "",
          password: "",
          confirmPassword: "",
          profilePicture: data.profile_picture || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        });
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <div className="settings-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`settings-main ${isSidebarOpen ? "" : "collapsed"}`}>
        <div className="header-bar">
          <div className="logo-area">
            <h2>Settings</h2>
          </div>
          <div className="user-area">
            <span>{formData.firstName || "User"}</span>
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
                {formData.firstName || ""} {formData.lastName || ""}
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




