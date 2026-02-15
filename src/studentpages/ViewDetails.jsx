import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewDetails.css";
import { EventContext } from "../context/EventContext";
import { useLocation } from "react-router-dom";

function ViewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { approvedEvents, registerForEvent } = useContext(EventContext);

  const event = approvedEvents.find((e) => String(e.id) === String(id));

  const location = useLocation();
  const isAdmin = location.state?.role === "admin";

  const [showConfirm, setShowConfirm] = useState(false);
  const [registered, setRegistered] = useState(false);

  if (!event) {
    return (
      <div className="view-details-page">
        <p>Event not found.</p>
        <button className="btn-outline" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const handleRegister = () => {
    registerForEvent(event.id);
    setRegistered(true);
    setShowConfirm(false);
  };

  return (
    <div className="view-details-page">
      <div className="view-details-card">
        <img
          src={event.image}
          alt={event.title}
          className="details-image"
        />

        <div className="details-content">
          <span className="details-badge">
            {event.category}
          </span>

          <h1>{event.title}</h1>

          <p className="details-meta">📅 {event.date}</p>
          <p className="details-meta">📍 {event.venue}</p>
          <p className="details-meta">
            👥 {event.registrations || 0} attending
          </p>

          <p className="details-description">
            This event is designed to give students real
            exposure, hands-on experience, and networking
            opportunities. Don’t miss it.
          </p>

          {/* ✅ REGISTER BUTTON REMOVED FOR ADMIN */}
          {!isAdmin && !registered ? (
            <button
              className="btn-primary"
              onClick={() => setShowConfirm(true)}
            >
              Register for Event
            </button>
          ) : (
            !isAdmin && (
              <div className="registered-success">
                ✅ You are registered
              </div>
            )
          )}

          <button
            className="btn-outline back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
      </div>

      {/* ===== CONFIRMATION MODAL ===== */}
      {showConfirm && !isAdmin && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Confirm Registration</h3>
            <p>
              Do you want to register for this event?
            </p>

            <div className="confirm-actions">
              <button
                className="btn-primary"
                onClick={handleRegister}
              >
                Confirm
              </button>
              <button
                className="btn-outline"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewDetails;
