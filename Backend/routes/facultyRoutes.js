const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/facultyController");

router.get("/", facultyController.getAllFaculty);
router.post("/", facultyController.createFaculty);
router.get("/:id", facultyController.getFaculty);
router.put("/:id", facultyController.updateFaculty);
router.delete("/:id", facultyController.deleteFaculty);

module.exports = router;
