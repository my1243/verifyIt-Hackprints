const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({

    studentId: { type: String, required: true, unique: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    semester: { type: Number, required: true },
    clg: { type: String, required: true },
    practicalExam: { type: Boolean, default: false },
    feeStatus: { type: Boolean, default: false },
    branch: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "branch" },

});


/*
PK : studentId
FK : branch
*/

const StudentCollection = mongoose.model("student", StudentSchema);
module.exports = StudentCollection;