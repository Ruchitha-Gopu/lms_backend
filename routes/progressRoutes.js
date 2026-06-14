const express = require("express");
const router = express.Router();

const Progress = require("../models/Progress");

router.get("/user/:userId", async (req, res) => {
  try {
    const progress = await Progress.find({
      userId: req.params.userId,
    });

    res.json(progress);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const progress = await Progress.create(req.body);

    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;