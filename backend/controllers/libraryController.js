const Library = require("../models/Library");
const Student = require("../models/Student");
const Book = require("../models/Book");

const createIssue = async (req, res) => {
  try {
    const issue = await Library.create(req.body);
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIssues = async (req, res) => {
  try {
    const issues = await Library.findAll({
      include: [
        { model: Student, attributes: ["id", "name", "className", "photo", "video"] },
        { model: Book, attributes: ["id", "name", "author", "publication", "year"] },
      ],
    });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateIssue = async (req, res) => {
  try {
    const issue = await Library.findByPk(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    await issue.update(req.body);
    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteIssue = async (req, res) => {
  try {
    const issue = await Library.findByPk(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    const { bookId, studentId } = issue;
    await issue.destroy();

    if (studentId) {
      await Student.destroy({ where: { id: studentId } });
    }
    if (bookId) {
      await Book.destroy({ where: { id: bookId } });
    }

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createIssue,
  getIssues,
  updateIssue,
  deleteIssue,
};