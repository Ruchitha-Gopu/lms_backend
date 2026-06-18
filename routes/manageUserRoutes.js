const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/User");

// GET ALL REGISTERED USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ADD USER FROM ADMIN PANEL
router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password || "123456",
      10
    );

    const user = await User.create({
      name,
      email: cleanEmail,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;