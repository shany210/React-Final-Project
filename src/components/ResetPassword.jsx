import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import "../styles/ResetPassword.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setError("Failed to reset password: " + error.message);
    } else {
      setMessage("Your password has been updated successfully.");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2 className="forgot-title">Set New Password</h2>
        <form className="forgot-form" onSubmit={handleReset}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="forgot-input"
            required
          />
          <button type="submit" className="forgot-button">
            Update Password
          </button>
          {message && <p className="forgot-success">{message}</p>}
          {error && <p className="forgot-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
