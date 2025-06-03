import React from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png"; 

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/signin");
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
          <input type="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" placeholder="Enter a password" required />

          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm your password" required />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
