const express = require("express");
const router = express.Router();

const Assignment = require("../models/Assignment");

// user dashboard - get assignments by userId
router.get("/user/:userId", async (req, res) => {
  try {
    const assignments = await Assignment.find({
      userId: req.params.userId,
    });

    res.json(assignments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// admin dashboard - get all assignments
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// admin add assignment
router.post("/", async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// update status
router.put("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(assignment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assignment deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;