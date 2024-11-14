const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const upload = require("../config/multerConfig");

router.get("/", studentController.getAllStudents);
router.post("/", studentController.createStudent);
router.get("/:id", studentController.getStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);
router.post(
  "/bulk-upload",
  upload.single("file"),
  studentController.bulkUpload
);

module.exports = router;
