const Progress =
  require("../models/Progress");

// Save Progress
const saveProgress =
  async (req, res) => {
    try {
      const {
        userId,
        courseId,
        percentage,
      } = req.body;

      let progress =
        await Progress.findOne({
          userId,
          courseId,
        });

      if (progress) {
        progress.percentage =
          percentage;

        await progress.save();

        return res.json(
          progress
        );
      }

      progress =
        await Progress.create({
          userId,
          courseId,
          percentage,
        });

      res.status(201).json(
        progress
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Get User Progress
const getProgress =
  async (req, res) => {
    try {
      const progress =
        await Progress.find({
          userId:
            req.params.userId,
        }).populate(
          "courseId"
        );

      res.json(progress);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  saveProgress,
  getProgress,
};