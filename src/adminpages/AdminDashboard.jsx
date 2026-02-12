import React, { useContext } from "react";
import "./AdminDashboard.css";
import { EventContext } from "../context/EventContext";

function AdminDashboard() {
  const {
    events,
    approvedEvents,
    pendingEvents,
    updateEventStatus
  } = useContext(EventContext);

  // ===== STATS =====
  const totalEvents = events.length;
  const totalRegistrations = approvedEvents.reduce(
    (sum, e) => sum + (e.registrations || 0),
    0
  );

  // ===== CATEGORY COUNTS =====
  const getCount = (cat) =>
    approvedEvents.filter((e) => e.category === cat).length;

  const totalApproved = approvedEvents.length || 1;

  const techPct = Math.round((getCount("Technology") / totalApproved) * 100);
  const culturalPct = Math.round((getCount("Cultural") / totalApproved) * 100);
  const academicPct = Math.round((getCount("Academic") / totalApproved) * 100);
  const sportsPct = Math.round((getCount("Sports") / totalApproved) * 100);

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      {/* ===== STATS ===== */}
      <div className="admin-stats">
        <div className="stat-card blue">
          <p>Total Events</p>
          <h2>{totalEvents}</h2>
        </div>

        <div className="stat-card green">
          <p>Total Registrations</p>
          <h2>{totalRegistrations}</h2>
        </div>

        <div className="stat-card yellow">
          <p>Pending Approvals</p>
          <h2>{pendingEvents.length}</h2>
        </div>
      </div>

      <div className="admin-main">
        {/* ===== PENDING APPROVALS ===== */}
        <div className="pending-section">
          <h2>Pending Event Approvals</h2>

          {pendingEvents.length === 0 ? (
            <p>No pending events.</p>
          ) : (
            pendingEvents.map((event) => (
              <div key={event.id} className="approval-card">
                <div className="approval-image-wrapper">
                  <img src={event.image} alt={event.title} />
                </div>

                <div className="approval-info">
                  <h3>{event.title}</h3>
                  <p>
                    {event.category} • {event.date}
                  </p>
                </div>

                <div className="approval-actions">
                  <button
                    className="approve-btn"
                    onClick={() =>
                      updateEventStatus(event.id, "approved")
                    }
                  >
                    ✓ Approve
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() =>
                      updateEventStatus(event.id, "rejected")
                    }
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ===== EVENT CATEGORIES (EXACT CIRCLE) ===== */}
        <div className="category-section">
          <h2>Event Categories</h2>
          

          <div className="exact-pie-wrapper">
            <svg width="260" height="260" viewBox="0 0 260 260">
              {/* Technology */}
              <path
                d="M130 130 L130 20 A110 110 0 0 1 240 130 Z"
                fill="#0d6efd"
              />
              {/* Cultural */}
              <path
                d="M130 130 L20 130 A110 110 0 0 1 130 20 Z"
                fill="#20c997"
              />
              {/* Academic */}
              <path
                d="M130 130 L130 240 A110 110 0 0 1 20 130 Z"
                fill="#ffc107"
              />
              {/* Sports */}
              <path
                d="M130 130 L240 130 A110 110 0 0 1 130 240 Z"
                fill="#fd7e14"
              />
            </svg>

            {/* LABELS */}
            <div className="pie-label top-right">
              Technology {techPct}%
            </div>
            <div className="pie-label top-left">
              Cultural {culturalPct}%
            </div>
            <div className="pie-label bottom-left">
              Academic {academicPct}%
            </div>
            <div className="pie-label bottom-right">
              Sports {sportsPct}%
            </div>
          
{/* ===== APPROVED EVENTS LIST ===== */}
<div className="admin-approved-section">
  <h2>Approved Events</h2>

  {approvedEvents.length === 0 ? (
    <p>No approved events yet.</p>
  ) : (
    <div className="events-grid">
      {approvedEvents.map((event) => (
        <div key={event.id} className="event-card">
          <div className="event-image-wrapper">
            <img src={event.image} alt={event.title} />
            <span className="status approved">Approved</span>
          </div>

          <div className="event-content">
            <h3>{event.title}</h3>
            <p>📅 {event.date}</p>
            <p>📍 {event.venue}</p>
            <p>👥 {event.registrations || 0} students registered</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
