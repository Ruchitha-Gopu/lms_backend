const express = require("express");
const router = express.Router();

const Quiz = require("../models/Quiz");

// ADD QUESTION
router.post("/", async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ALL QUESTIONS
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({
      createdAt: -1,
    });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET QUESTIONS BY TOPIC
router.get("/:topic", async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      topic: req.params.topic,
    });

    res.json(quizzes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE QUESTION
router.delete("/:id", async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);

    res.json({
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;