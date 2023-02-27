const express = require("express");
const router = express.Router();

//controllers
const {
  createExamSchedule,
  getExamSchedules,
  getExamSchedulesByBranch,
  updateExamSchedule,
  deleteExamSchedule,
  deleteAllExamSchedules,
  getExamSchedulesByFaculty,
  verifyStudent,
  getVerifiedStudent,
} = require("../../Controllers/exam-schedule-cntrl");

router.post("/create-exam-schedule", createExamSchedule);
router.post("/get-exam-schedules", getExamSchedules);
router.patch("/update-exam-schedule", updateExamSchedule);
router.put("/verifyStudent", verifyStudent);
router.post("/getVerifiedStudent", getVerifiedStudent);
router.delete("/delete-exam-schedule", deleteExamSchedule);

router.post("/get-specific-exam-schedule", getExamSchedulesByBranch);
router.post("/get-specific-exam-by-fac-schedule", getExamSchedulesByFaculty);
router.delete("/delete-all-exam-schedulees", deleteAllExamSchedules);

module.exports = router;
