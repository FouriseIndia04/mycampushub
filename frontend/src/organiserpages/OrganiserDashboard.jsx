import React, { useState, useEffect } from "react";
import "./OrganiserDashboard.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Login-ui/context/AuthContext";

/* =========================
   CONSTANTS
========================= */
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87";

function OrganiserDashboard() {

  const navigate = useNavigate();
  const { user } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "Academic",
    date: "",
    time: "",
    venue: "",
    capacity: "",
    description: "",
    imageBase64: ""
  });

  /* =========================
     FETCH MY EVENTS
  ========================= */
  useEffect(() => {
    if (!user?._id) return; // ✅ safety

    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const myEvents = data.filter(e => e.organiserId === user._id);
          setEvents(myEvents);
        } else {
          setEvents([]);
        }
      })
      .catch(err => {
        console.log(err);
        setEvents([]);
      });
  }, [user]);

  /* =========================
     FORM HANDLERS
  ========================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, imageBase64: reader.result });
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  /* =========================
     SUBMIT EVENT (BACKEND)
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      alert("Login required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          date: formData.date,
          time: formData.time,
          venue: formData.venue,
          capacity: formData.capacity,
          description: formData.description,
          image: formData.imageBase64 || DEFAULT_IMAGE,
          organiserId: user._id
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Event submitted for approval");

        // ✅ instantly update UI
        setEvents(prev => [...prev, data]);

        setShowForm(false);
        setFormData({
          title: "",
          category: "Academic",
          date: "",
          time: "",
          venue: "",
          capacity: "",
          description: "",
          imageBase64: ""
        });
        setImagePreview(null);
      } else {
        alert(data.message || "Failed to create event");
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="organiser-container">

      <div className="organiser-topbar navbar-upgrade">
        <div>
          <h1>
            Manage <span className="text-highlight">Your Events</span>
          </h1>
          <p className="subtitle">
            Create, update and track your campus events
          </p>
        </div>
      </div>

      <section className="organiser-header">
        <button
          className="primary-btn"
          onClick={() => setShowForm(true)}
        >
          + Create Event
        </button>
      </section>

      {/* =========================
         FORM
      ========================= */}
      {showForm && (
        <section className="form-section">
          <form className="event-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Create New Event</h2>

            <div className="form-grid">
              <input name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required />

              <select name="category" value={formData.category} onChange={handleChange}>
                <option>Academic</option>
                <option>Technology</option>
                <option>Cultural</option>
                <option>Sports</option>
              </select>

              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              <input type="time" name="time" value={formData.time} onChange={handleChange} required />
              <input name="venue" placeholder="Venue" value={formData.venue} onChange={handleChange} required />
              <input type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleChange} />
            </div>

            <textarea name="description" placeholder="Describe your event..." value={formData.description} onChange={handleChange} />

            <div className="upload-section">
              <label className="upload-box">
                Upload Poster Image
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </label>

              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button type="submit" className="primary-btn">
                Submit Event
              </button>
            </div>
          </form>
        </section>
      )}

      {/* =========================
         EVENTS LIST
      ========================= */}
      <section className="events-section">
        <h2 className="section-title">My Events</h2>

        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id || event.id} className="event-card">

              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <span className={`status ${event.status}`}>
                  {event.status}
                </span>
              </div>

              <div className="event-body">
                <h3>{event.title}</h3>
                <p>📅 {event.date}</p>
                <p>📍 {event.venue}</p>

                {/* 🔥 CRITICAL FIX */}
                <button
                  className="btn-outline"
                  onClick={() =>
                    navigate(`/event/${event._id || event.id}`, {
                      state: { event },
                    })
                  }
                >
                  View Details
                </button>

              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default OrganiserDashboard;