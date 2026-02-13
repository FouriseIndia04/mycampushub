import React, { useState, useContext } from "react";
import "./StudentDashboard.css";
import { EventContext } from "../context/EventContext";

function StudentDashboard() {
  const [activeAction, setActiveAction] = useState(null);
const [activeTopAction, setActiveTopAction] = useState("student");

  const { approvedEvents } = useContext(EventContext);
  const [showToast, setShowToast] = useState(false);

  const handleViewDetails = () => {
    setShowToast(true);

    // auto hide after 2 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (<div className="student-page">
  <div className="student-container">

      {/* ===== TOP BAR ===== */}
      <div className="student-topbar">
      <div className="student-hero">
  <h1>
    Discover <span>Campus Events</span>
  </h1>
 <p>
  Workshops, seminars, hackathons and experiences{" "}
  <span className="hero-highlight">curated for you</span>.
</p>

</div>
       <div className="student-actions">
          <button className="btn-outline">Browse Events</button>
          <button className="btn-outline">Log In</button>
          <button className="btn-primary">Sign Up</button>
        </div>
      </div>


      {/* ===== UPCOMING EVENTS ===== */}
  <div className="events-section">
  <h2 className="section-title section-upcoming">Upcoming Events</h2>
  {/* events grid */}
</div>




      {approvedEvents.length === 0 ? (
        <p>No upcoming events available.</p>
      ) : (
        <div className="events-grid">
          {approvedEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image-wrapper">
                <img src={event.image} alt={event.title} />
                <span className="event-badge">{event.category}</span>
              </div>

              <div className="event-content">
                <h3>{event.title}</h3>

                <div className="event-meta">📅 {event.date}</div>
                <div className="event-meta">📍 {event.venue}</div>
                <div className="event-meta">
                  👥 {event.registrations || 0} attending
                </div>

                <div className="event-footer">
                  <span
                    className="details-link"
                    onClick={handleViewDetails}
                  >
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      

      {/* ===== TOAST / NOTIFICATION POP ===== */}
      {showToast && (
        <div className="toast-notification">
          Viewing details
        </div>
      )}
    </div>
    </div>
    
  );
}

<footer className="app-footer">
  <div className="footer-content">
    <p>
      © {new Date().getFullYear()} CampusHub · Built for smarter campus
      experiences
    </p>

    <div className="footer-links">
      <span>Privacy</span>
      <span>Terms</span>
      <span>Support</span>
    </div>
  </div>
</footer>

export default StudentDashboard;
