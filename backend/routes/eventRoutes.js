const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createEvent,
  getMyEvents,
  updateEventStatus,
  deleteEvent
} = require("../controllers/eventController");

// Organizer
router.post("/", auth, role("organizer"), createEvent);
router.get("/", auth, role("organizer"), getMyEvents);

// Admin
router.put("/:id", auth, role("admin"), updateEventStatus);
router.delete("/:id", auth, role("admin"), deleteEvent);

module.exports = router;