import React, { useState, useContext } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../context/EventContext";

function AdminDashboard() {
  const navigate = useNavigate();
  const { events, approvedEvents, pendingEvents, updateEventStatus } =
    useContext(EventContext);

  const [activeTab, setActiveTab] = useState("pending");

  const rejectedEvents = events.filter(
    (e) => e.status === "rejected"
  );

  const filteredEvents =
    activeTab === "pending"
      ? pendingEvents
      : activeTab === "approved"
      ? approvedEvents
      : rejectedEvents;

  // ===== STATS =====
  const totalEvents = events.length;
  const totalRegistrations = approvedEvents.reduce(
    (sum, e) => sum + (e.registrations || 0),
    0
  );

  // ===== CATEGORY LOGIC =====
  const getCount = (cat) =>
    approvedEvents.filter((e) => e.category === cat).length;

  const totalApproved = approvedEvents.length || 4;

  const techPct = Math.round((getCount("Technology") / totalApproved) * 100);
  const culturalPct = Math.round((getCount("Cultural") / totalApproved) * 100);
  const academicPct = Math.round((getCount("Academic") / totalApproved) * 100);
  const sportsPct = Math.round((getCount("Sports") / totalApproved) * 100);

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h1 className="admin-title">
          Admin <span className="text-highlight">Control Panel</span>
        </h1>

        {/* ===== STATS ===== */}
        <div className="admin-stats">
          <div className="stat-card">
            <p>Total Events</p>
            <h2>{totalEvents}</h2>
          </div>
          <div className="stat-card">
            <p>Total Registrations</p>
            <h2>{totalRegistrations}</h2>
          </div>
          <div className="stat-card">
            <p>Pending Approvals</p>
            <h2>{pendingEvents.length}</h2>
          </div>
        </div>

        {/* ===== TOGGLES ===== */}
        <div className="admin-tabs">
          <button
            className={`btn-outline ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
          <button
            className={`btn-outline ${activeTab === "approved" ? "active" : ""}`}
            onClick={() => setActiveTab("approved")}
          >
            Approved
          </button>
          <button
            className={`btn-outline ${activeTab === "rejected" ? "active" : ""}`}
            onClick={() => setActiveTab("rejected")}
          >
            Rejected
          </button>
        </div>

        {/* ===== MAIN GRID ===== */}
        <div className="admin-main">
          {/* EVENTS */}
          <div>
            {filteredEvents.length === 0 ? (
              <p className="empty-text">No {activeTab} events.</p>
            ) : (
              filteredEvents.map((event) => (
                <div key={event.id} className="approval-card">
                  <img src={event.image} alt={event.title} />

                  <div className="approval-info">
                    <h3>{event.title}</h3>
                    <p>
                      {event.category} • {event.date}
                    </p>
                    <p>📍 {event.venue}</p>

                    <button
                      className="btn-outline"
                      onClick={() => navigate(`/event/${event.id}`)}
                    >
                      View Details
                    </button>

                    {activeTab === "pending" && (
                      <div className="approval-actions">
                        <button
                          className="btn-primary"
                          onClick={() =>
                            updateEventStatus(event.id, "approved")
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="btn-outline danger"
                          onClick={() =>
                            updateEventStatus(event.id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ===== CATEGORY CHART ===== */}
          <div className="category-section">
            <h2>Event Categories</h2>

            <svg width="260" height="260" viewBox="0 0 260 260">
              <path d="M130 130 L130 20 A110 110 0 0 1 240 130 Z" fill="#0d6efd" />
              <path d="M130 130 L20 130 A110 110 0 0 1 130 20 Z" fill="#20c997" />
              <path d="M130 130 L130 240 A110 110 0 0 1 20 130 Z" fill="#ffc107" />
              <path d="M130 130 L240 130 A110 110 0 0 1 130 240 Z" fill="#fd7e14" />
            </svg>

            <div className="chart-labels">
              <div className="label tech">Technology {techPct}%</div>
              <div className="label cultural">Cultural {culturalPct}%</div>
              <div className="label academic">Academic {academicPct}%</div>
              <div className="label sports">Sports {sportsPct}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
