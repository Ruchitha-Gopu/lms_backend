const express = require("express");
const router = express.Router();

const Course = require("../models/Course");

/*
POST
/api/user/courses
Add Course
*/

router.post("/courses", async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/*
GET
/api/user/courses
Get All Courses
*/

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/*
GET
/api/user/courses/:id
Get Single Course
*/

router.get("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(
      req.params.id
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;