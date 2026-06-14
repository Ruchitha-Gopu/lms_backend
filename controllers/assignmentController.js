import Assignment from "../models/Assignment.js";

// CREATE assignment
export const createAssignment = async (req, res) => {
  try {
    const data = await Assignment.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET all assignments
export const getAssignments = async (req, res) => {
  try {
    const data = await Assignment.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE assignment status
export const updateAssignment = async (req, res) => {
  try {
    const data = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE assignment
export const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};