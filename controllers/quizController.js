const Quiz = require(
  "../models/Quiz"
);

// Get Quiz Questions
const getQuiz =
  async (req, res) => {
    try {
      const quiz =
        await Quiz.find({
          courseId:
            req.params.courseId,
        });

      res.json(quiz);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Add Quiz Question
const createQuiz =
  async (req, res) => {
    try {
      const quiz =
        await Quiz.create(
          req.body
        );

      res.status(201).json(
        quiz
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Submit Quiz
const submitQuiz =
  async (req, res) => {
    try {
      const {
        score,
      } = req.body;

      res.json({
        message:
          "Quiz Submitted",
        score,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  getQuiz,
  createQuiz,
  submitQuiz,
};