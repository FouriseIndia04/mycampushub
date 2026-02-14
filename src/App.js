import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StudentDashboard from "./studentpages/StudentDashboard";
import AdminDashboard from "./adminpages/AdminDashboard";
import ViewDetails from "./studentpages/ViewDetails";
import OrganiserDashboard from "./organiserpages/OrganiserDashboard";

import { EventProvider } from "./context/EventContext";

function App() {
  return (
    <EventProvider>
      <Router>
        <Routes>
          <Route path="/organiser" element={<OrganiserDashboard />}/>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* 🔑 THIS IS THE IMPORTANT ONE */}
          <Route path="/event/:id" element={<ViewDetails />} />
        </Routes>
      </Router>
    </EventProvider>
  );
}

export default App;
