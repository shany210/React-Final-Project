import React, { useState } from "react";
import "../styles/ForgotPassword.css";
import { supabase } from "../supabase/supabaseClient";
import logo from "../assets/Logo.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(null);

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Reset link sent to your email.");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <div className="forgot-heading">
          <h2>Forgot Password</h2>
          <img src={logo} alt="StudySync Logo" className="inline-logo-right" />
        </div>
        <form className="forgot-form" onSubmit={handleResetPassword}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit" className="forgot-btn">
            Send Reset Link
          </button>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}
