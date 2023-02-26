const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
  fId: { type: String, required: true, unique: true },
  fShortName: { type: String, unique: true, required: true },
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  // branch: {
  // 	type: mongoose.Schema.Types.ObjectId,
  // 	required: true,
  // 	ref: "branch",
  // },
  branchId: {
    type: String,
    required: true,
  },
  allotments: [
    {
      allotment: { type: mongoose.Schema.Types.ObjectId, ref: "examSchedule" },
    },
  ],
});

/*
PK : fId
F.K : branch, hall
*/

const FacultyCollection = mongoose.model("faculty", FacultySchema);
module.exports = FacultyCollection;
