const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({

    branchId: { type: String, required: true },
    branchName: { type: String, required: true },
    degree: { type: String, required: true },
    semester: { type: Number, required: true, min: 1, max: 12 },
    subjects: [{
        subjectCode: { type: String, required: true },
        subjectName: { type: String, required: true },
        allotments: [{
            allotment: { type: mongoose.Schema.Types.ObjectId, ref: "examSchedule" },
        }],
    }],
    allotments: [{
        allotment: { type: mongoose.Schema.Types.ObjectId, ref: "examSchedule" },
    }],
});

/*
PK : branchId(bracnh short name) , semester
*/

const BranchCollection = mongoose.model("branch", BranchSchema);
module.exports = BranchCollection;