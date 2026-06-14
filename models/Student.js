const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    course: String,
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);