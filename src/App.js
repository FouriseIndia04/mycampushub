import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StudentDashboard from "./studentpages/StudentDashboard";
import OrganiserDashboard from "./organiserpages/OrganiserDashboard";
import AdminDashboard from "./adminpages/AdminDashboard";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/organiser" element={<OrganiserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
