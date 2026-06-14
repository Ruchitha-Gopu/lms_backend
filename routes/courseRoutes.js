const express = require("express");
const router = express.Router();

const Course = require("../models/Course");

router.get("/", async (req, res) => {
  const courses = await Course.find();

  res.json(courses);
});

router.post("/", async (req, res) => {
  try {
    const course = await Course.create(
      req.body
    );

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  await Course.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Course Deleted",
  });
});

module.exports = router;