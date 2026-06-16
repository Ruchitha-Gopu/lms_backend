const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

router.get("/", async (req, res) => {
  const assignments = await Assignment.find().populate("userId", "name email");
  res.json(assignments);
});

router.get("/user/:userId", async (req, res) => {
  const assignments = await Assignment.find({
    userId: req.params.userId,
  });

  res.json(assignments);
});

router.post("/", async (req, res) => {
  const assignment = await Assignment.create(req.body);
  res.status(201).json(assignment);
});

router.put("/:id", async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(assignment);
});

router.delete("/:id", async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.json({ message: "Assignment deleted" });
});

module.exports = router;