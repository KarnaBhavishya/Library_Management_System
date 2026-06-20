const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

router.post(
  "/",
  upload.fields([
    { name: "photo" },
    { name: "video" },
  ]),
  createStudent
);

router.get("/", getStudents);

router.put(
  "/:id",
  upload.fields([
    { name: "photo" },
    { name: "video" },
  ]),
  updateStudent
);

router.delete("/:id", deleteStudent);

module.exports = router;