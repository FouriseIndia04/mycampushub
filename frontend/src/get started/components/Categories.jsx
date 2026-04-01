import React from "react";
import heroImg from "../assets/images/hero.jpeg";
import "./Categories.css";

const categories = [
  "Technical",
  "Cultural",
  "Sports",
  "Workshop",
  "Hackathon",
  "Seminar"
];

const Categories = () => {
  return (
    <section className="categories-section">
      <div className="container">

        <div className="categories-hero">
          <img src={heroImg} alt="Campus Events" />
        </div>

        <h2>Event Categories</h2>
        <p className="subtext">
          Explore diverse events across campus
        </p>

        <div className="categories-grid">
          {categories.map((cat, i) => (
            <div key={i} className="category-card">
              {cat}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Categories;
