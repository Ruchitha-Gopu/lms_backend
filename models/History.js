const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  courseTitle: String,
  watchedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "History",
  historySchema
);