import React from "react";
import "../styles/SignIn.css";
import logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom"; 

export default function SignIn() {
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard"); 
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <div className="signin-heading">
          <h2>Welcome</h2>
          <img src={logo} alt="StudySync Logo" className="inline-logo-right" />
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />

          <button type="submit">Sign In</button>
        </form>

        <div className="signin-links">
          <a href="#">Forgot password</a>
          <a href="#">Register</a>
        </div>
      </div>
    </div>
  );
}


