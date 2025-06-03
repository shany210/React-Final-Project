import React from "react";
import "../styles/Landing.css";
import monitorImage from "../assets/desktop3.png";
import logoIcon from "../assets/symbol.png"; 
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate(); 

  return (
    <div className="landing">
      <div className="left-section">
        <div className="desk-shape"></div> 
        <img src={monitorImage} alt="StudySync App Preview" />
      </div>

      <div className="right-section">
        <div className="logo-wrapper">
          <img src={logoIcon} alt="StudySync Icon" className="logo-icon" />
          <h1 className="logo-title">StudySync</h1>
        </div>

        <p className="slogan">
          Never miss a deadline.<br />
          Never search for notes again.
        </p>
        <p className="desc highlight">
          Your academic assistant<br />is here to help!
        </p>

        <div className="btn-group">
          <button className="btn primary" onClick={() => navigate("/signin")}>
            Sign In
          </button>
          <button className="btn secondary" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
