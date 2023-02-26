const express = require('express');
const router = express.Router();


//controllers
const {
    createStudent,
    getStudents,
    getSpecificStudent,
    updateStudent,
    deleteStudent,
    deleteAllStudents,

} = require("../../Controllers/student-cntrl");


router.post("/create-student", createStudent);
router.post("/get-students", getStudents);
router.post("/get-specific-student", getSpecificStudent);
router.patch("/update-student", updateStudent);
router.delete("/delete-student", deleteStudent);
router.delete("/delete-all-studentes", deleteAllStudents);

module.exports = router;