const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  adminDashboard,
  organizerDashboard,
  studentDashboard,
} = require("../controllers/dashboardController");

//  ROUTES
router.get("/admin", auth, role("admin"), adminDashboard);
router.get("/organiser", auth, role("organiser"), organizerDashboard);
router.get("/student", auth, role("student"), studentDashboard);
module.exports = router;