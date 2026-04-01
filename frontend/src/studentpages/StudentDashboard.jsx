import React, { useState, useEffect } from "react";
import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Login-ui/context/AuthContext";

function StudentDashboard() {

  const [events, setEvents] = useState([]);

  const { user } = useAuth();
  const navigate = useNavigate();

  const studentName = user?.name || "Student";

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // ✅ FETCH EVENTS FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.log("Invalid data:", data);
          setEvents([]);
        }
      })
      .catch(err => {
        console.log(err);
        setEvents([]);
      });
  }, []);

  // ✅ FILTER ONLY APPROVED EVENTS + SEARCH + SORT
  const filteredEvents = events
    .filter((e) => e.status === "approved") // 🔥 important fix
    .filter((event) =>
      event.title?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") return new Date(a.date) - new Date(b.date);
      if (sortBy === "time") return (a.time || "").localeCompare(b.time || "");
      return 0;
    });

  return (
    <div className="student-page">

      <div className="student-container">

        <div className="student-topbar navbar-upgrade">

          <div className="student-hero">
            <h1>
              Discover <span>Campus Events</span>
            </h1>
            <p>
              Workshops, seminars, hackathons and experiences{" "}
              <span className="hero-highlight">curated for you</span>.
            </p>
          </div>

          <div className="topbar-right">
            <div className="student-greeting">
              <div className="greeting-text">
                Hi, <span>{studentName}</span> 👋
              </div>

              <div
                className="profile-icon"
                onClick={() => navigate("/profile")}
              >
                👤
              </div>
            </div>
          </div>
        </div>

        <div className="search-sort-bar">
          <div className="search-box">
            🔍
            <input
              type="text"
              placeholder="Search events..."
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

        <div className="events-section">
          <h2 className="section-title">Upcoming Events</h2>
        </div>

        {filteredEvents.length === 0 ? (
          <p>No upcoming events available.</p>
        ) : (
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <div key={event._id || event.id} className="event-card">

                <div className="event-image-wrapper">
                  <img src={event.image} alt={event.title} />
                  <span className="event-badge">{event.category}</span>
                </div>

                <div className="event-content">
                  <h3>{event.title}</h3>
                  <div className="event-meta">📅 {event.date}</div>
                  <div className="event-meta">📍 {event.venue}</div>

                  <div className="event-footer">
                    <span
                      className="details-link"
                      onClick={() =>
                        navigate(`/event/${event._id || event.id}`, {
                          state: { event }, // 🔥 CRITICAL FIX
                        })
                      }
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

    </div>
  );
}

export default StudentDashboard;