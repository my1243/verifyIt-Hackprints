const mongoose = require('mongoose');

const HallSchema = new mongoose.Schema({

    hallNo: { type: Number, required: true, min: 1, max: 50 },
    capacity: { type: Number, required: true, min: 1, max: 120 },
    rollNoRange: {
        startRollNo: { type: String, minlength: 5, maxlength: 5 },
        endRollNo: { type: String, minlength: 5, maxlength: 5 },
    },
    allotments: [{
        allotment: { type: mongoose.Schema.Types.ObjectId, ref: "examSchedule" },
    }],
});

/*
PK : hallNo
*/
const HallCollection = mongoose.model("hall", HallSchema);
module.exports = HallCollection;