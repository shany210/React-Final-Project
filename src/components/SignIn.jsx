import React, { useState, useContext } from "react";
import "../styles/SignIn.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { supabase } from "../supabase/supabaseClient";
import { UserContext } from "./UserContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { setProfile } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        console.error("Login error:", authError);
        setError("Login failed: " + authError.message);
        return;
      }

      const user = authData.user;
      const { data: profileData, error: profileError } = await supabase
        .from("users_profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError || !profileData) {
        console.error("Profile fetch error:", profileError);
        setError("Login succeeded, but profile not found.");
        return;
      }

      setProfile(profileData);
      alert("You have successfully connected.");

      if (profileData.role?.toLowerCase() === "admin") {
        navigate("/admin"); // ✅ נתיב תואם לקובץ App.jsx
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <div className="signin-heading">
          <h2>Sign In</h2>
          <img src={logo} alt="StudySync Logo" className="inline-logo-right" />
        </div>
        <form className="signin-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
          <button type="submit" className="signin-btn">Sign In</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

