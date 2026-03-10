import React, { useState, useContext } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../context/EventContext";

function AdminDashboard() {
  const navigate = useNavigate();

  const {
    events,
    approvedEvents,
    pendingEvents,
    updateEventStatus,
    deleteEvent,
  } = useContext(EventContext);

  const [activeTab, setActiveTab] = useState("pending");

  /* =========================
     FILTERING
  ========================= */

  const rejectedEvents = events.filter(
    (e) => e.status === "rejected"
  );

  const filteredEvents =
    activeTab === "pending"
      ? pendingEvents
      : activeTab === "approved"
      ? approvedEvents
      : rejectedEvents;

  /* =========================
     STATS
  ========================= */

  const totalEvents = events.length;

  const totalRegistrations = approvedEvents.reduce(
    (sum, e) => sum + (e.registrations || 0),
    0
  );

  /* =========================
     DELETE HANDLER
  ========================= */

  const handleDeleteEvent = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this rejected event?"
    );

    if (!confirmDelete) return;

    deleteEvent(id);
  };

  /* =========================
     PIE CHART LOGIC
  ========================= */

  const CATEGORY_COLORS = {
    Technology: "#6a4cff",
    Cultural: "#ec4899",
    Academic: "#22c55e",
    Sports: "#f59e0b",
  };

  const categoryCounts = approvedEvents.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {});

  const totalApproved = approvedEvents.length;

  const polarToCartesian = (cx, cy, r, angle) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const describeArc = (cx, cy, r, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      cx,
      cy,
      "L",
      start.x,
      start.y,
      "A",
      r,
      r,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "Z",
    ].join(" ");
  };

  let cumulativeAngle = 0;

  /* =========================
     RENDER
  ========================= */

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

        {/* ===== TABS ===== */}
        <div className="admin-tabs">
          <button
            className={`btn-outline ${
              activeTab === "pending" ? "active" : ""
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>

          <button
            className={`btn-outline ${
              activeTab === "approved" ? "active" : ""
            }`}
            onClick={() => setActiveTab("approved")}
          >
            Approved
          </button>

          <button
            className={`btn-outline ${
              activeTab === "rejected" ? "active" : ""
            }`}
            onClick={() => setActiveTab("rejected")}
          >
            Rejected
          </button>
        </div>

        <div className="admin-main">
          {/* ===== EVENTS LIST ===== */}
          <div>
            {filteredEvents.length === 0 ? (
              <p className="empty-text">
                No {activeTab} events.
              </p>
            ) : (
              filteredEvents.map((event) => (
                <div key={event.id} className="approval-card">
                  <img
                    src={event.image}
                    alt={event.title}
                  />

                  <div className="approval-info">
                    <h3>{event.title}</h3>
                    <p>
                      {event.category} • {event.date}
                    </p>
                    <p>📍 {event.venue}</p>

                    {/* VIEW ONLY — NO REGISTER */}
                    <button
                      className="btn-outline"
                      onClick={() =>
                        navigate(`/event/${event.id}`, {
                          state: { role: "admin" },
                        })
                      }
                    >
                      View Details
                    </button>

                    {/* ACTIONS */}
                    {activeTab === "pending" && (
                      <div className="approval-actions">
                        <button
                          className="btn-primary"
                          onClick={() =>
                            updateEventStatus(
                              event.id,
                              "approved"
                            )
                          }
                        >
                          Approve
                        </button>

                        <button
                          className="btn-outline danger"
                          onClick={() =>
                            updateEventStatus(
                              event.id,
                              "rejected"
                            )
                          }
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {activeTab === "rejected" && (
                      <button
                        className="btn-outline danger"
                        onClick={() =>
                          handleDeleteEvent(event.id)
                        }
                      >
                        Delete Permanently
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ===== CATEGORY CHART ===== */}
          <div className="category-section">
            <h2>Event Categories</h2>

            {totalApproved === 0 ? (
              <p className="empty-text">
                No approved events
              </p>
            ) : (
              <svg
                width="260"
                height="260"
                viewBox="0 0 260 260"
              >
                {Object.entries(categoryCounts).map(
                  ([category, count]) => {
                    const angle =
                      (count / totalApproved) * 360;

                    const path = describeArc(
                      130,
                      130,
                      110,
                      cumulativeAngle,
                      cumulativeAngle + angle
                    );

                    cumulativeAngle += angle;

                    return (
                      <path
                        key={category}
                        d={path}
                        fill={
                          CATEGORY_COLORS[category] ||
                          "#999"
                        }
                      />
                    );
                  }
                )}
              </svg>
            )}

            <div className="chart-labels">
              {Object.entries(categoryCounts).map(
                ([category, count]) => (
                  <div
                    key={category}
                    className="label"
                  >
                    <span
                      className="dot"
                      style={{
                        background:
                          CATEGORY_COLORS[category] ||
                          "#999",
                      }}
                    />
                    {category}{" "}
                    {Math.round(
                      (count / totalApproved) * 100
                    )}
                    %
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
