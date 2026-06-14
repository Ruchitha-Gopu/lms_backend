const Course = require(
  "../models/Course"
);

// Get All Courses
const getCourses = async (
  req,
  res
) => {
  try {
    const courses =
      await Course.find();

    res.json(courses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Course
const getCourseById =
  async (req, res) => {
    try {
      const course =
        await Course.findById(
          req.params.id
        );

      if (!course) {
        return res
          .status(404)
          .json({
            message:
              "Course Not Found",
          });
      }

      res.json(course);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Create Course
const createCourse =
  async (req, res) => {
    try {
      const {
        title,
        description,
        instructor,
        thumbnail,
      } = req.body;

      const course =
        await Course.create({
          title,
          description,
          instructor,
          thumbnail,
        });

      res.status(201).json(
        course
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Update Course
const updateCourse =
  async (req, res) => {
    try {
      const course =
        await Course.findById(
          req.params.id
        );

      if (!course) {
        return res
          .status(404)
          .json({
            message:
              "Course Not Found",
          });
      }

      course.title =
        req.body.title ||
        course.title;

      course.description =
        req.body.description ||
        course.description;

      course.instructor =
        req.body.instructor ||
        course.instructor;

      const updated =
        await course.save();

      res.json(updated);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Delete Course
const deleteCourse =
  async (req, res) => {
    try {
      const course =
        await Course.findById(
          req.params.id
        );

      if (!course) {
        return res
          .status(404)
          .json({
            message:
              "Course Not Found",
          });
      }

      await Course.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Course Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};