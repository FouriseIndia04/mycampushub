import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./get started/pages/Home";

import { AuthProvider } from "./Login-ui/context/AuthContext";
import { EventProvider } from "./context/EventContext";
import ProtectedRoute from "./context/ProtectedRoute";

/* ===== LOGIN UI ===== */
import Login from "./Login-ui/loginpages/Login";
import Signup from "./Login-ui/loginpages/Signup";
import ForgotPassword from "./Login-ui/loginpages/ForgotPassword";
import StudentAuth from "./Login-ui/loginpages/StudentAuth";
import OrganizerAuth from "./Login-ui/loginpages/OrganizerAuth";
import AdminAuth from "./Login-ui/loginpages/AdminAuth";

/* ===== DASHBOARDS ===== */
import StudentDashboard from "./studentpages/StudentDashboard";
import OrganiserDashboard from "./organiserpages/OrganiserDashboard";
import AdminDashboard from "./adminpages/AdminDashboard";
import Profile from "./studentpages/Profile";
import ViewDetails from "./studentpages/ViewDetails";

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Router>
          <Routes>

            {/* ===== PUBLIC LANDING ===== */}
            <Route path="/" element={<Home />} />

            {/* ===== AUTH ===== */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/student-auth" element={<StudentAuth />} />
            <Route path="/organizer-auth" element={<OrganizerAuth />} />
            <Route path="/admin-auth" element={<AdminAuth />} />

            {/* ===== STUDENT ===== */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            {/* ===== ORGANISER ===== */}
            <Route
              path="/organiser"
              element={
                <ProtectedRoute allowedRoles={["organiser"]}>
                  <OrganiserDashboard />
                </ProtectedRoute>
              }
            />

            {/* ===== ADMIN ===== */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* ===== SHARED ===== */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={["student", "admin", "organiser"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/event/:id"
              element={
                <ProtectedRoute allowedRoles={["student", "admin"]}>
                  <ViewDetails />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
