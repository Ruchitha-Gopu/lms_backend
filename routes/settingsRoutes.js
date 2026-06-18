const express = require("express");
const router = express.Router();

const Setting = require("../models/Setting");

router.get("/user/:userId", async (req, res) => {
  try {
    let settings = await Setting.findOne({
      userId: req.params.userId,
    });

    if (!settings) {
      settings = await Setting.create({
        userId: req.params.userId,
        name: "",
        email: "",
        password: "",
        phone: "",
        education: "",
        darkMode: false,
        notifications: true,
      });
    }

    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch settings",
      error: error.message,
    });
  }
});

router.put("/user/:userId", async (req, res) => {
  try {
    const updatedSettings = await Setting.findOneAndUpdate(
      { userId: req.params.userId },
      {
        userId: req.params.userId,
        name: req.body.name || "",
        email: req.body.email || "",
        password: req.body.password || "",
        phone: req.body.phone || "",
        education: req.body.education || "",
        darkMode: req.body.darkMode ?? false,
        notifications: req.body.notifications ?? true,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update settings",
      error: error.message,
    });
  }
});

module.exports = router;