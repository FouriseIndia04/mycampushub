import React, { useState } from "react";
import "./AdminAuth.css";

const AdminAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    adminCode: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      alert(`Admin login: ${form.email}`);
    } else {
      alert(`Admin registered: ${form.name}`);
    }
  };

  return (
    <div className="admin-auth-container">

      {/* LEFT */}
      <div className="admin-auth-left">
        <div className="overlay">
          <h2>🛠️ Admin Portal</h2>
          <h1>Welcome to CampusHub</h1>
          <p>
            Manage users, approve events, and control your campus platform securely.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="admin-auth-right">
        <div className="admin-auth-box">

          <h2>{isLogin ? "Admin Login" : "Admin Register"}</h2>

          <form onSubmit={handleSubmit}>

            {!isLogin && (
              <>
                <label>Full Name</label>
                <input
                  name="name"
                  placeholder="Admin name"
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@college.edu"
              onChange={handleChange}
              required
            />

            {!isLogin && (
              <>
                <label>Admin Secret Code</label>
                <input
                  name="adminCode"
                  placeholder="Enter admin code"
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
            {isLogin ? "New admin?" : "Already registered?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Register here" : " Login here"}
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
