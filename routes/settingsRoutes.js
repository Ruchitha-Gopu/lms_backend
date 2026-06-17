const express = require("express");
const router = express.Router();

const Setting = require("../models/Setting");

// GET SETTINGS
router.get("/:userId", async (req, res) => {
  try {
    const settings = await Setting.findOne({
      userId: req.params.userId,
    });

    if (!settings) {
      return res.status(404).json({
        message: "Settings not found",
      });
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE / UPDATE SETTINGS
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      password,
      darkMode,
      notifications,
    } = req.body;

    let settings = await Setting.findOne({
      userId,
    });

    if (settings) {
      settings.name = name;
      settings.email = email;
      settings.password = password;
      settings.darkMode = darkMode;
      settings.notifications = notifications;

      await settings.save();

      return res.json(settings);
    }

    settings = await Setting.create({
      userId,
      name,
      email,
      password,
      darkMode,
      notifications,
    });

    res.status(201).json(settings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;