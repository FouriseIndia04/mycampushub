import React from "react";
import "./Home.css";
import collegeEvent from "../assets/college-event.jpg";

function Home() {
  return (
    <div className="home">
      <nav className="navbar">
        <h2>EventWise</h2>
        <button>Get Started</button>
      </nav>

      <div className="hero">
        <div className="hero-text">
          <h1>
            Your Campus Events, <br />
            <span>Redefined</span>
          </h1>
          <p>
            Discover, organize, and join college events with ease.
            All-in-one platform for campus event management.
          </p>

          <div className="hero-buttons">
            <button>Join Now</button>
            <button className="outline">Learn More</button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src={collegeEvent}
            alt="College Event" />
        </div>
      </div>

      <div className="features">
        <div className="card">📅 Event Calendar</div>
        <div className="card">📝 Instant Registration</div>
        <div className="card">🎯 Organize Events</div>
        <div className="card">🔍 Discover</div>
      </div>
    </div>
  );
}

export default Home;