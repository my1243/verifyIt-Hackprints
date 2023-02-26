const express = require('express');
const router = express.Router();


//controllers
const {
    createExamSchedule,
    getExamSchedules,
    getExamSchedulesByBranch,
    updateExamSchedule,
    deleteExamSchedule,
    deleteAllExamSchedules

} = require("../../Controllers/exam-schedule-cntrl");


router.post("/create-exam-schedule", createExamSchedule);
router.post("/get-exam-schedules", getExamSchedules);
router.patch("/update-exam-schedule", updateExamSchedule);
router.delete("/delete-exam-schedule", deleteExamSchedule);

router.post("/get-specific-exam-schedule", getExamSchedulesByBranch);
router.delete("/delete-all-exam-schedulees", deleteAllExamSchedules);

module.exports = router;