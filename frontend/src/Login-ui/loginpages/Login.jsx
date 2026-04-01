import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleLogo from "../assets/google.png";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 MAIN LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    // Simple demo role detection
    let role = "student";
    if (email.includes("organizer")) role = "organiser";
    if (email.includes("admin")) role = "admin";

    const userData = {
      email,
      role,
    };

    login(userData);

    // Redirect based on role
    if (role === "organiser") navigate("/organiser");
    else if (role === "admin") navigate("/admin");
    else navigate("/student");
  };

  // 🔥 DEMO LOGIN
  const demoLogin = (role) => {
    let demoEmail = "";
    let demoPassword = "";

    if (role === "Student") {
      demoEmail = "student@college.edu";
      demoPassword = "student123";
      login({ email: demoEmail, role: "student" });
      navigate("/student");
    } 
    else if (role === "Organizer") {
      demoEmail = "organizer@college.edu";
      demoPassword = "organizer123";
      login({ email: demoEmail, role: "organiser" });
      navigate("/organiser");
    } 
    else if (role === "Admin") {
      demoEmail = "admin@college.edu";
      demoPassword = "admin123";
      login({ email: demoEmail, role: "admin" });
      navigate("/admin");
    }

    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  // 🔥 GOOGLE LOGIN (demo)
  const handleGoogleLogin = async () => {
    try {
      const userData = {
        email: "googleuser@gmail.com",
        role: "student",
      };

      login(userData);
      navigate("/student");
    } catch (error) {
      console.error(error);
      alert("Google login failed!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="overlay">
            <h2>📅 CampusEvents</h2>
            <h1>Your Campus Life, Streamlined.</h1>
            <p>
              Discover events, join clubs, and manage your student activities all
              in one place.
            </p>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-box">
            <h2>Welcome Back</h2>

            {/* 🔥 FORM */}
            <form onSubmit={handleLogin}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="name@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button className="primary-btn">Login →</button>
            </form>

            <p className="signup-text">
              <button
                type="button"
                className="link-btn"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </p>

            {/* 🔥 GOOGLE */}
            <div className="google-login-container">
              <button className="google-btn" onClick={handleGoogleLogin}>
                <img src={GoogleLogo} alt="Google" className="google-icon" />
                Continue with Google
              </button>
            </div>

            <p className="signup-text">
              Don’t have an account?{" "}
              <button
                type="button"
                className="link-btn"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </p>

            {/* 🔥 QUICK LOGIN */}
            <div className="quick-login">
              <p>QUICK LOGIN</p>
              <div className="demo-buttons">
                <button onClick={() => demoLogin("Student")}>Student</button>
                <button onClick={() => demoLogin("Organizer")}>Organizer</button>
                <button onClick={() => demoLogin("Admin")}>Admin</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
