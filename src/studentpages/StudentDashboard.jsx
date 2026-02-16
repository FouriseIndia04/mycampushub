import React, { useState, useContext } from "react";
import "./StudentDashboard.css";
import { EventContext } from "../context/EventContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Login-ui/context/AuthContext";

function StudentDashboard() {
  const { approvedEvents } = useContext(EventContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const studentName = user?.name || "Student";

  /* ===== SEARCH + SORT STATE ===== */
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const filteredEvents = approvedEvents
    .filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") return new Date(a.date) - new Date(b.date);
      if (sortBy === "time") return a.time?.localeCompare(b.time || "");
      return 0;
    });

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

          {/* ===== GREETING + PROFILE ===== */}
          <div className="student-greeting">
            <div className="greeting-text">
              Hi, <span>{studentName}</span> 👋
            </div>

            <div
              className="profile-icon"
              title="Profile"
              onClick={() => navigate("/profile")}
            >
              👤
            </div>
          </div>
        </div>

        {/* ===== SEARCH + SORT ===== */}
        <div className="search-sort-bar">
          <div className="search-box">
            🔍
            <input
              type="text"
              placeholder="Search events, workshops, hackathons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="sort-toggle">
            <span
              className={sortBy === "date" ? "active" : ""}
              onClick={() => setSortBy("date")}
            >
              📅 Date
            </span>
            <span
              className={sortBy === "time" ? "active" : ""}
              onClick={() => setSortBy("time")}
            >
              ⏰ Time
            </span>
          </div>
        </div>

        {/* ===== UPCOMING EVENTS ===== */}
        <div className="events-section">
          <h2 className="section-title section-upcoming">Upcoming Events</h2>
        </div>

        {filteredEvents.length === 0 ? (
          <p>No upcoming events available.</p>
        ) : (
          <div className="events-grid">
            {filteredEvents.map((event) => (
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

      <footer className="premium-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="app-name">CampusHub</span>
            <span className="divider">•</span>
            <span className="tagline">Smart Campus Event Management</span>
          </div>
          <div className="footer-right">
            <span>© 2026 CampusHub</span>
            <span className="divider">|</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default StudentDashboard;
