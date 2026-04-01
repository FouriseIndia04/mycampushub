import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("campushub_user"));

  const handleLogout = () => {
    localStorage.removeItem("campushub_user");
    navigate("/");
  };

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="profile-page">
      <h1>👤 Profile</h1>
      <p><strong>Role:</strong> {user.role}</p>

      <button className="btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
