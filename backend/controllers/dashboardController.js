const User = require("../models/User");
const Event = require("../models/Event");

//  ADMIN
const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const pendingEvents = await Event.countDocuments({ status: "pending" });

    res.json({ totalUsers, totalEvents, pendingEvents });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  ORGANIZER
const organizerDashboard = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id });

    res.json({ totalEvents: events.length, events });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  STUDENT
const studentDashboard = async (req, res) => {
  try {
    const events = await Event.find({ status: "approved" });

    res.json({ totalEvents: events.length, events });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  VERY IMPORTANT EXPORT
module.exports = {
  adminDashboard,
  organizerDashboard,
  studentDashboard,
};