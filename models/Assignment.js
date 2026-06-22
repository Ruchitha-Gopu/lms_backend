const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  course: String,
  title: String,
  description: String,
  dueDate: String,
  marks: Number,
  status: {
    type: String,
    default: "Pending",
  },
});
   
module.exports = mongoose.model(
  "Assignment",
  assignmentSchema
);