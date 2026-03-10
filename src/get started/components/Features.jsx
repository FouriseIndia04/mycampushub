import React from "react";
import "./Features.css";

const features = [
  {
    title: "Event Discovery",
    desc: "Browse and discover exciting campus events tailored to your interests."
  },
  {
    title: "Instant Registration",
    desc: "Register for events with a single click and instant confirmation."
  },
  {
    title: "Community Connect",
    desc: "Connect with peers and grow your campus network."
  },
  {
    title: "Track Participation",
    desc: "Track your event history and participation easily."
  }
];

const Features = () => {
  return (
    <section className="features-section">
      <div className="container">
        <h2>Why Choose CampusHub?</h2>

        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
