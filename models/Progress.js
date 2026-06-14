const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  totalCourses: Number,
  completedCourses: Number,
  assignmentsSubmitted: Number,
  quizzesCompleted: Number,
  progressPercentage: Number,
});

module.exports = mongoose.model(
  "Progress",
  progressSchema
);