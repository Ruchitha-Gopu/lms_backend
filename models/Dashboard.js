const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  userId: String,
  totalCourses: Number,
  completedCourses: Number,
  totalAssignments: Number,
  pendingAssignments: Number,
  submittedAssignments: Number,
  quizzesCompleted: Number,
  totalCertificates: Number,
  progressPercentage: Number,
});

module.exports = mongoose.model(
  "Dashboard",
  dashboardSchema
);