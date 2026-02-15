import React, { useState, useContext } from "react";
import "./OrganiserDashboard.css";
import { EventContext } from "../context/EventContext";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87";

function OrganiserDashboard() {
  const [showForm, setShowForm] = useState(false);
  const { addEvent, events } = useContext(EventContext);

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

  const [imagePreview, setImagePreview] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 FIXED IMAGE HANDLING (BASE64)
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

  const handleSubmit = (e) => {
    e.preventDefault();

    addEvent({
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      capacity: formData.capacity,
      description: formData.description,
      image: formData.imageBase64 || DEFAULT_IMAGE,
      status: "pending"
    });

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
  };

  return (
    <div className="organiser-container">
      <section className="organiser-header">
        <div>
          <h1>
            Manage <span className="text-highlight">Your Events</span>
          </h1>
          <p className="subtitle">
            Create, update and track your campus events
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => {
            setEditingEvent(null);
            setShowForm(true);
          }}
        >
          + Create Event
        </button>
      </section>

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
              <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="primary-btn">Submit Event</button>
            </div>
          </form>
        </section>
      )}

      <section className="events-section">
        <h2 className="section-title">My Events</h2>

        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <span className={`status ${event.status}`}>{event.status}</span>
              </div>
              <div className="event-body">
                <h3>{event.title}</h3>
                <p>📅 {event.date}</p>
                <p>📍 {event.venue}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default OrganiserDashboard;
