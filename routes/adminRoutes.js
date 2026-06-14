const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const Course = require("../models/Course");
const Assignment = require("../models/Assignment");
const Quiz = require("../models/Quiz");

router.get("/reports", async (req, res) => {
  try {
    const students = await Student.countDocuments();
    const courses = await Course.countDocuments();
    const assignments = await Assignment.countDocuments();
    const quizzes = await Quiz.countDocuments();

    res.json({
      students,
      courses,
      assignments,
      quizzes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;