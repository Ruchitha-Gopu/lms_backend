const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const cleanEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          "This email is already registered. Please login or use another email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: cleanEmail,
      password: hashedPassword,
      role: role || "user",
    });

    await sendEmail(
      cleanEmail,
      "LMS Registration Successful",
      `
      <h2>Hello ${name},</h2>
      <p>Your LMS account has been created successfully.</p>
      <p>Role: <b>${user.role}</b></p>
      `
    );

    res.status(201).json({
      message: "Registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const cleanEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "Email not registered. Please register first.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    await sendEmail(
      user.email,
      "LMS Login Successful",
      `
      <h2>Hello ${user.name},</h2>
      <p>You logged in successfully.</p>
      <p>Your login token is valid for <b>2 hours</b>.</p>
      `
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;