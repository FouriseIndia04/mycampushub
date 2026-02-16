import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./OrganizerAuth.css";

const OrganizerAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    organization: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      alert(`Organizer login: ${form.email}`);

      login({ role: "organiser" });
      navigate("/organiser");
    } else {
      alert(`Organizer registered: ${form.name}`);

      login({ role: "organiser" });
      navigate("/organiser");
    }
  };

  return (
    <div className="auth-page">
      <div className="organizer-auth-container">

        {/* LEFT */}
        <div className="organizer-auth-left">
          <div className="overlay">
            <h2>📅 Organizer Portal</h2>
            <h1>Welcome to CampusHub</h1>
            <p>
              Create and manage events, reach students, and grow your campus community.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="organizer-auth-right">
          <div className="organizer-auth-box">

            <h2>{isLogin ? "Organizer Login" : "Organizer Register"}</h2>

            <form onSubmit={handleSubmit}>

              {!isLogin && (
                <>
                  <label>Full Name</label>
                  <input
                    name="name"
                    placeholder="Your name"
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="organizer@college.edu"
                onChange={handleChange}
                required
              />

              {!isLogin && (
                <>
                  <label>Organization</label>
                  <input
                    name="organization"
                    placeholder="Organization name"
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
              />

              <button className="primary-btn">
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            <p className="switch-text">
              {isLogin ? "New organizer?" : "Already registered?"}
              <span onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? " Register here" : " Login here"}
              </span>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default OrganizerAuth;
