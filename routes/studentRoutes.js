const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

router.get("/", async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
});

router.post("/", async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
});

router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student Deleted" });
});

module.exports = router;