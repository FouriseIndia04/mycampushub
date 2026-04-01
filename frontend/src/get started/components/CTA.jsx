import React from "react";
import { useNavigate } from "react-router-dom";
import "./CTA.css";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="cta-card">
        <h2>
          Ready to <span>get started</span>?
        </h2>

        <p>
          Join thousands of students making the most of their college experience.
        </p>

        <button
          className="cta-btn"
          onClick={() => navigate("/student-auth?mode=signup")}
        >
          Get Started →
        </button>
      </div>
    </section>
  );
};

export default CTA;
