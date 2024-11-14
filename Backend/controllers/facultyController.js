const Faculty = require("../models/Faculty");

exports.getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFaculty = async (req, res) => {
  const faculty = new Faculty(req.body);
  try {
    const newFaculty = await faculty.save();
    res.status(201).json(newFaculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (faculty) {
      res.json(faculty);
    } else {
      res.status(404).json({ message: "Faculty not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(faculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFaculty = async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: "Faculty deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
