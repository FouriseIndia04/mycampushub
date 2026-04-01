const Event = require("../models/Event");

// ================= CREATE EVENT =================
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      category,
      date,
      time,
      venue,
      capacity,
      description,
      imageBase64,
    } = req.body;

    // 🔥 Validation
    if (!title || !category || !date || !time || !venue || !description) {
      return res.status(400).json({
        success: false,
        message: "All required fields missing ❌",
      });
    }

    // ✅ Create event
    const event = await Event.create({
      title,
      category,
      date,
      time,
      venue,
      capacity,
      description,
      imageBase64,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully ✅",
      event,
    });

  } catch (err) {
    console.log("CREATE EVENT ERROR:", err.message);

    res.status(500).json({
      success: false,
      message: "Failed to create event ❌",
    });
  }
};

// ================= GET MY EVENTS =================
exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id }).sort({ createdAt: -1 });

    res.json(events);
  } catch (err) {
    console.log("GET EVENTS ERROR:", err.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch events ❌",
    });
  }
};

// ================= UPDATE EVENT STATUS (ADMIN) =================
exports.updateEventStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      message: "Event updated ✅",
      event,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Update failed ❌",
    });
  }
};

// ================= DELETE EVENT =================
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Event deleted ",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Delete failed ",
    });
  }
};