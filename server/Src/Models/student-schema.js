const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
	studentId: { type: String, required: true, unique: true },
	fname: { type: String, required: true },
	lname: { type: String, required: true },
	rollNo: { type: String, required: true, unique: true },
	semester: { type: Number, required: true },
	clg: { type: String, required: true },
	img: { type: String },
	// practicalExam: { type: Boolean, required: true },
	practicalExam: [
		{
			subjectCode: { type: String, required: true },
			examStatus: { type: Boolean, default: false },
		},
	],
	feeStatus: { type: Boolean, default: false },
	branch: { type: mongoose.Types.ObjectId, required: true },
	allotments: [
		{
			allotment: { type: mongoose.Schema.Types.ObjectId, ref: "examSchedule" },
		},
	],
});

/*
PK : studentId
FK : branch
*/

const StudentCollection = mongoose.model("student", StudentSchema);
module.exports = StudentCollection;
