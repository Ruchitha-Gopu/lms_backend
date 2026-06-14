const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  courseName: String,
  certificateId: String,
  issueDate: String,
  status: String,
  certificateUrl: String,
});

module.exports = mongoose.model(
  "Certificate",
  certificateSchema
);