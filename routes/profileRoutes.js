const express = require("express");
const router = express.Router();

const Profile = require("../models/Profile");

// GET PROFILE BY USER ID
router.get("/user/:userId", async (req, res) => {
  try {
    let profile = await Profile.findOne({
      userId: req.params.userId,
    });

    if (!profile) {
      profile = await Profile.create({
        userId: req.params.userId,
        name: "",
        email: "",
        phone: "",
        education: "",
        role: "Student",
        skills: [],
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE PROFILE
router.put("/user/:userId", async (req, res) => {
  try {
    const updatedProfile =
      await Profile.findOneAndUpdate(
        { userId: req.params.userId },
        req.body,
        {
          new: true,
          upsert: true,
        }
      );

    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;