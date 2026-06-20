const Student = require("../models/Student");
const Library = require("../models/Library");

const createStudent = async (req, res) => {
  try {
    const student = await Student.create({
      name: req.body.name,
      className: req.body.className,
      photo: req.files?.photo?.[0]?.filename || "",
      video: req.files?.video?.[0]?.filename || "",
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const updateData = {
      name: req.body.name,
      className: req.body.className,
    };

    if (req.files?.photo?.[0]?.filename) {
      updateData.photo = req.files.photo[0].filename;
    }
    if (req.files?.video?.[0]?.filename) {
      updateData.video = req.files.video[0].filename;
    }

    await student.update(updateData);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    // Check if student has assigned library records
    const assigned = await Library.findOne({ where: { studentId: req.params.id } });
    if (assigned) {
      return res.status(400).json({ message: "Student is assigned to book" });
    }
    await student.destroy();
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
};