import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [showOrganisers, setShowOrganisers] = useState(false);

  /* =========================
     FETCH EVENTS (BACKEND)
  ========================= */
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]);
        }
      })
      .catch(err => {
        console.log(err);
        setEvents([]);
      });
  }, []);

  /* =========================
     FILTERING
  ========================= */
  const pendingEvents = events.filter(e => e.status === "pending");
  const approvedEvents = events.filter(e => e.status === "approved");
  const rejectedEvents = events.filter(e => e.status === "rejected");

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
    (sum, e) => sum + (e.registrations?.length || 0),
    0
  );

  /* =========================
     BACKEND ACTIONS
  ========================= */
  const updateEventStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        setEvents(prev =>
          prev.map(e => (e._id === id ? { ...e, status } : e))
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEvent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setEvents(prev => prev.filter(e => e._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* =========================
     MOCK ORGANISER (UNCHANGED)
  ========================= */
  const organisers = [
    { id: 1, name: "Rahul Sharma", contact: "+91 9876543210", blocked: false },
    { id: 2, name: "Ankit Verma", contact: "+91 9123456789", blocked: true }
  ];

  return (
    <div className="admin-page">
      <div className="admin-container">

        {/* HEADER */}
        <div className="admin-topbar navbar-upgrade">
          <h1 className="admin-title">
            Admin <span className="text-highlight">Control Panel</span>
          </h1>

          <div className="admin-nav">
            <span
              className={!showOrganisers ? "active-tab" : ""}
              onClick={() => setShowOrganisers(false)}
            >
              Events
            </span>

            <span
              className={showOrganisers ? "active-tab" : ""}
              onClick={() => setShowOrganisers(true)}
            >
              Organisers
            </span>
          </div>
        </div>

        {/* ORGANISER PANEL */}
        {showOrganisers ? (
          <div className="organiser-panel">
            <h2>Organisers Management</h2>

            {organisers.map((org) => (
              <div key={org.id} className="organiser-card">
                <div>
                  <h3>{org.name}</h3>
                  <p>{org.contact}</p>
                </div>

                <button className="btn-outline danger">
                  {org.blocked ? "Unblock" : "Block"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* STATS */}
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

            {/* TABS */}
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

            {/* EVENTS */}
            <div className="admin-main">
              <div>
                {filteredEvents.length === 0 ? (
                  <p className="empty-text">No {activeTab} events.</p>
                ) : (
                  filteredEvents.map((event) => (
                    <div key={event._id} className="approval-card">

                      <img src={event.image} alt={event.title} />

                      <div className="approval-info">
                        <h3>{event.title}</h3>
                        <p>{event.category} • {event.date}</p>
                        <p>📍 {event.venue}</p>

                        <button
                          className="btn-outline"
                          onClick={() =>
                            navigate(`/event/${event._id}`, {
                              state: { event },
                            })
                          }
                        >
                          View Details
                        </button>

                        {activeTab === "pending" && (
                          <div className="approval-actions">
                            <button
                              className="btn-primary"
                              onClick={() =>
                                updateEventStatus(event._id, "approved")
                              }
                            >
                              Approve
                            </button>

                            <button
                              className="btn-outline danger"
                              onClick={() =>
                                updateEventStatus(event._id, "rejected")
                              }
                            >
                              Reject
                            </button>
                          </div>
                        )}

                        {activeTab === "rejected" && (
                          <button
                            className="btn-outline danger"
                            onClick={() => deleteEvent(event._id)}
                          >
                            Delete Permanently
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;