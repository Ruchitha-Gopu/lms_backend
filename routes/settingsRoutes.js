const express = require("express");
const router = express.Router();

const Settings =
  require("../models/Settings");

// Get Settings
router.get("/", async (req, res) => {
  try {
    const settings =
      await Settings.find();

    res.json(settings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Create Settings
router.post("/", async (req, res) => {
  try {
    const settings =
      await Settings.create(req.body);

    res.status(201).json(settings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update Settings
router.put("/:id", async (req, res) => {
  try {
    const settings =
      await Settings.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(settings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;