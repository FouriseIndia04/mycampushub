import React, { useEffect, useState } from "react";
import "./ViewDetails.css";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../Login-ui/context/AuthContext";

function ViewDetails() {

  const { id } = useParams();
  const location = useLocation();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔥 TEMP USER (FOR TESTING ONLY)
  const testUserId = user?._id || "test-user-123";

  /* =========================
     FETCH EVENT
  ========================= */
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/api/events/${id}`)
      .then(res => res.json())
      .then(data => {

        if (data && !data.message) {
          setEvent(data);

          // check registration
          if (data.registrations?.includes(testUserId)) {
            setIsRegistered(true);
          }

        } else if (location.state?.event) {
          const fallbackEvent = location.state.event;
          setEvent(fallbackEvent);

          if (fallbackEvent.registrations?.includes(testUserId)) {
            setIsRegistered(true);
          }
        }

        setLoading(false);
      })
      .catch(() => {
        if (location.state?.event) {
          const fallbackEvent = location.state.event;
          setEvent(fallbackEvent);

          if (fallbackEvent.registrations?.includes(testUserId)) {
            setIsRegistered(true);
          }
        }
        setLoading(false);
      });

  }, [id, location, testUserId]);

  /* =========================
     REGISTER
  ========================= */
  const handleRegister = async () => {

    try {
      const res = await fetch(`http://localhost:5000/api/events/register/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: testUserId
        })
      });

      const data = await res.json();

      if (res.ok) {
        setIsRegistered(true);
        alert("✅ Successfully registered!");
      } else {
        alert(data.message || "Registration failed");
      }

    } catch (err) {
      console.log(err);
    }
  };

  /* =========================
     CANCEL
  ========================= */
  const handleCancel = async () => {

    try {
      const res = await fetch(`http://localhost:5000/api/events/register/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: testUserId
        })
      });

      if (res.ok) {
        setIsRegistered(false);
        alert("❌ Registration cancelled");
      }

    } catch (err) {
      console.log(err);
    }
  };

  /* =========================
     UI STATES
  ========================= */
  if (loading) return <p>Loading event...</p>;

  if (!event) {
    return (
      <div className="details-container">
        <h2>⚠️ Event not found</h2>
      </div>
    );
  }

  return (
    <div className="view-details-page">

      <div className="details-container">

        <div className="details-image">
          <img src={event.image} alt={event.title} />
        </div>

        <div className="details-content">
          <h1>{event.title}</h1>

          <p className="details-meta">📅 {event.date}</p>
          <p className="details-meta">⏰ {event.time}</p>
          <p className="details-meta">📍 {event.venue}</p>

          <p className="details-description">
            {event.description}
          </p>

          {!isRegistered ? (
            <button className="btn-primary" onClick={handleRegister}>
              Register Now
            </button>
          ) : (
            <button className="btn-outline danger" onClick={handleCancel}>
              Cancel Registration
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default ViewDetails;