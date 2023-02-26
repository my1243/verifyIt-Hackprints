const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    fId: { type: String, required: true, unique: true },
    fName: { type: String, required: true },
    fShortName: { type: String, required: true },
    branch: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "branch" },
    halls: [{
        hall: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "hall" }
    }],
});

/*
PK : fId
F.K : branch, hall
*/

const FacultyCollection = mongoose.model("faculty", FacultySchema);
module.exports = FacultyCollection;