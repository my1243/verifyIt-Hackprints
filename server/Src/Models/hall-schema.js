const mongoose = require('mongoose');

const HallSchema = new mongoose.Schema({

    hallNo: { type: Number, required: true, min: 1, max: 50 },
    capacity: { type: Number, required: true, min: 1, max: 120 },
    rollNoRange: {
        startRollNo: { type: String, default: "XX000" },
        endRollNo: { type: String, default: "XX000" },
    },
    available: { type: Boolean, default: true },
    allocatedBranch: { type: mongoose.Schema.Types.ObjectId, ref: "branch" }
});

/*
PK : hallNo
*/
const HallCollection = mongoose.model("hall", HallSchema);
module.exports = HallCollection;