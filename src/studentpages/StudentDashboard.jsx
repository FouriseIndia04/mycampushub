import React, { useState, useContext } from "react";
import "./StudentDashboard.css";
import { EventContext } from "../context/EventContext";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const [activeAction, setActiveAction] = useState(null);
  const [activeTopAction, setActiveTopAction] = useState("student");

  const { approvedEvents } = useContext(EventContext);
  const navigate = useNavigate();

  return (
    <div className="student-page">
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
                      onClick={() => navigate(`/event/${event.id}`)}
                    >
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

     <footer class="premium-footer">
  <div class="footer-inner">
    <div class="footer-left">
      <span class="app-name">CampusHub</span>
      <span class="divider">•</span>
      <span class="tagline">Smart Campus Event Management</span>
    </div>

    <div class="footer-right">
      <span>© 2026 CampusHub</span>
      <span class="divider">|</span>
      <span>All rights reserved</span>
    </div>
  </div>
</footer>

    </div>
  );
}

export default StudentDashboard;
