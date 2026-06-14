const mongoose = require("mongoose");

const lessonSchema =
  new mongoose.Schema(
    {
      courseId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "Course",
      },

      title: String,

      videoUrl: String,
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Lesson",
    lessonSchema
  );