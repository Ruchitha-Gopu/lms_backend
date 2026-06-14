const express = require("express");
const router = express.Router();

const Assignment = require("../models/Assignment");
const Certificate = require("../models/Certificate");
const Progress = require("../models/Progress");

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const assignments = await Assignment.find({ userId });
    const certificates = await Certificate.find({ userId });
    const progress = await Progress.findOne({ userId });

    res.json({
      totalAssignments: assignments.length,
      pendingAssignments: assignments.filter(
        (a) => a.status === "Pending"
      ).length,
      submittedAssignments: assignments.filter(
        (a) => a.status === "Submitted"
      ).length,
      totalCertificates: certificates.length,
      totalCourses: progress?.totalCourses || 0,
      completedCourses: progress?.completedCourses || 0,
      quizzesCompleted: progress?.quizzesCompleted || 0,
      progressPercentage: progress?.progressPercentage || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;