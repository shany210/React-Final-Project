import React, { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { supabase } from "../supabase/supabaseClient";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(error.message);
    } else {
      alert("You have registered successfully. Please check your email for confirmation.");
      navigate("/signin");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-heading">
          <h2>Welcome</h2>
          <img src={logo} alt="StudySync Logo" className="inline-logo-right" />
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
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

          <button type="submit" className="register-btn">Register</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}
