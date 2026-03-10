import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);

    // ✅ go back to login page
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="overlay">
          <h2>📅 CampusEvents</h2>
          <h1>Forgot Password</h1>
          <p>Enter your email to receive a password reset link.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <h2>Reset Password</h2>

          <form onSubmit={handleReset}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button className="primary-btn">Send Reset Link</button>
          </form>

          <p className="signup-text">
            Remembered your password?
            <button
              type="button"
              className="link-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
