import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";



import Login from "./loginpages/Login";
import Signup from "./loginpages/Signup";
import ForgotPassword from "./loginpages/ForgotPassword";

import StudentAuth from "./loginpages/StudentAuth";
import OrganizerAuth from "./loginpages/OrganizerAuth";
import AdminAuth from "./loginpages/AdminAuth";


function App() {
  return (
    <AuthProvider>
    <EventProvider>
      <Router>
        <Routes>

          

          {/* ✅ AUTH ROUTES */}
          <Route path="/student-auth" element={<StudentAuth />} />
          <Route path="/organizer-auth" element={<OrganizerAuth />} />
          <Route path="/admin-auth" element={<AdminAuth />} />

          
          <Route path="/" element={<Login />} />


          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />





        </Routes>
      </Router>
    </EventProvider>
    </AuthProvider>
  );
}

export default App;
