const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    fId: { type: String, required: true, unique: true },
    fShortName: { type: String, unique: true, required: true },
    fName: { type: String, required: true },
    branch: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "branch" },
    halls: [{
        hall: { type: mongoose.Schema.Types.ObjectId, ref: "hall", required: true },
    }]
});

/*
PK : fId
F.K : branch, hall
*/

const FacultyCollection = mongoose.model("faculty", FacultySchema);
module.exports = FacultyCollection;