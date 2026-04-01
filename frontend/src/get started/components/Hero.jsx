import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-card">

        <span className="hero-badge">
          ✨ Welcome to MyCampusHub Events
        </span>

        <h1>
          Your Campus,
          <br />
          <span>Your Events</span>
        </h1>

        <p>
          Discover, register, and participate in amazing college events.
          Connect with your campus community effortlessly.
        </p>

        <div className="hero-actions">
     
          
        </div>

      </div>
    </section>
  );
};

export default Hero;
