import React, { useState, useContext } from "react";
import "./StudentDashboard.css";
import { EventContext } from "../context/EventContext";

function StudentDashboard() {
  const { approvedEvents } = useContext(EventContext);
  const [showToast, setShowToast] = useState(false);

  const handleViewDetails = () => {
    setShowToast(true);

    // auto hide after 2 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div style={{ padding: "30px" }}>
      {/* ===== TOP BAR ===== */}
      <div className="student-topbar">
        <h1>CampusEvents</h1>

        <div className="student-actions">
          <button className="btn-outline">Browse Events</button>
          <button className="btn-outline">Log In</button>
          <button className="btn-primary">Sign Up</button>
        </div>
      </div>

      <h2>Explore Campus Events</h2>
      <p>
        Discover workshops, seminars, and club activities happening at your
        college.
      </p>

      {/* ===== UPCOMING EVENTS ===== */}
      <h2 style={{ marginTop: "30px" }}>Upcoming Events</h2>

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
  );
}

export default StudentDashboard;
