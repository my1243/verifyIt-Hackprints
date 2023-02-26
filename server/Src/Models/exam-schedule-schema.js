const mongoose = require('mongoose');

const ExamScheduleSchema = new mongoose.Schema({
    examName: { type: String, required: true },
    examDate: { type: String, required: true },
    examStartTime: { type: String, required: true },
    examEndTime: { type: String, required: true },
    examYear: { type: String, required: true }, //e.g. 2020, 2023, 2024
    branch: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "branch" },
    hall: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "hall" },
    faculty: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "faculty" },
    subject: { type: mongoose.Schema.Types.ObjectId, required: true, },
});

/*
PK :
examDate,
subject,
branch
*/

const ExamScheduleCollection = mongoose.model("examSchedule", ExamScheduleSchema);
module.exports = ExamScheduleCollection;