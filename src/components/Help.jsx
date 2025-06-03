import React, { useState } from "react";
import Sidebar from "./Sidebar";
import arrowIcon from "../assets/arrow.svg";
import "../styles/Help.css";

export default function Help() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const faq = [
    {
      question: "How do I add a new summary?",
      answer: "Click on '+ Add Summary' in the Summary Library and fill in the required fields including uploading a PDF or DOCX file.",
    },
    {
      question: "How can I manage my tasks?",
      answer: "Navigate to Task Management and click '+ Add Task' to insert a new one. You can filter tasks by priority and view due dates.",
    },
    {
      question: "Can I change my profile details?",
      answer: "Yes, go to Settings. You can update your name, email, phone, password, and upload a new profile picture.",
    },
    {
      question: "What happens if I forget my password?",
      answer: "If you're already signed in, go to Settings and change it. If you're locked out, please contact technical support.",
    },
  ];

  return (
    <div className="help-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`help-main ${isSidebarOpen ? "" : "collapsed"}`}>
        <div className="header-bar">
          <div className="logo-area">
            <h2>Help</h2>
          </div>
          <div className="user-area">
            <span>Noam Shavit</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt="User"
              className="user-icon"
            />
          </div>
        </div>

        <div className="help-content">
          <h3 className="section-title">FAQ</h3>
          <div className="faq-section">
            {faq.map((item, index) => (
              <div key={index} className={`faq-item ${openIndex === index ? "open" : ""}`}>
                <button className="faq-question" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                  <strong>{item.question}</strong>
                  <img src={arrowIcon} alt="arrow" className={`arrow-icon ${openIndex === index ? "rotate" : ""}`} />
                </button>
                {openIndex === index && <div className="faq-answer">{item.answer}</div>}
              </div>
            ))}
          </div>

          <div className="support-section">
            <h3>Technical support</h3>
            <p>If you encounter a problem, you can contact us at:</p>
            <p>Email: <a href="mailto:support@studysync.com">support@studysync.com</a></p>
            <p>Phone: 03-5555555</p>
          </div>
        </div>
      </div>
    </div>
  );
}
