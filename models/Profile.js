const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    email: String,
    phone: String,
    education: String,
    role: String,
    skills: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);