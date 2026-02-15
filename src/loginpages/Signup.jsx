import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Account Created Successfully 🎉\nName: ${fullName}\nEmail: ${email}`);
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="overlay">
          <h2>📅 CampusEvents</h2>
          <h1>Join CampusEvents Today</h1>
          <p>Create your account and explore events.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <h2>Create Account</h2>

          <form onSubmit={handleSignup}>
            <label>Full Name</label>
            <input 
              type="text" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
            />

            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />

            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />

            <button className="primary-btn">Sign Up</button>
          </form>

          <p className="signup-text">
            Already have an account? 
            <button type="button" className="link-btn" onClick={() => navigate("/")}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
