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
    imageFile: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, imageFile: file });
    setImagePreview(URL.createObjectURL(file));
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
      image: imagePreview || DEFAULT_IMAGE,
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
      imageFile: null
    });
    setImagePreview(null);
  };

  return (
    <div className="organiser-container">
      {/* HEADER */}
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

      {/* CREATE EVENT SECTION */}
      {showForm && (
        <section className="form-section">
          <form className="event-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Create New Event</h2>

            <div className="form-grid">
              <input
                name="title"
                placeholder="Event Title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Academic</option>
                <option>Technology</option>
                <option>Cultural</option>
                <option>Sports</option>
              </select>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />

              <input
                name="venue"
                placeholder="Venue"
                value={formData.venue}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                value={formData.capacity}
                onChange={handleChange}
              />
            </div>

            <textarea
              name="description"
              placeholder="Describe your event..."
              value={formData.description}
              onChange={handleChange}
            />

            <div className="upload-section">
              <label className="upload-box">
                Upload Poster Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
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

      {/* MY EVENTS */}
      <section className="events-section">
        <h2 className="section-title">My Events</h2>

        {events.length === 0 ? (
          <p className="empty-text">No events created yet.</p>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
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
                </div>

                {event.status === "pending" && (
                  <button
                    className="btn-outline"
                    onClick={() => {
                      setEditingEvent(event);
                      setFormData({
                        title: event.title,
                        category: event.category,
                        date: event.date,
                        time: event.time,
                        venue: event.venue,
                        capacity: event.capacity,
                        description: event.description,
                        imageFile: null
                      });
                      setImagePreview(event.image);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>
            © {new Date().getFullYear()} CampusHub · Built for smarter campus
            experiences
          </p>
        </div>
      </footer>
    </div>
  );
}

export default OrganiserDashboard;
