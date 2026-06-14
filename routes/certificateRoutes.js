const express = require("express");
const router = express.Router();

const Certificate = require("../models/Certificate");

router.get("/user/:userId", async (req, res) => {
  try {
    const certificates =
      await Certificate.find({
        userId: req.params.userId,
      });

    res.json(certificates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const certificate =
      await Certificate.create(req.body);

    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;