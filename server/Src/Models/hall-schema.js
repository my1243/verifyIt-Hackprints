const mongoose = require('mongoose');

const HallSchema = new mongoose.Schema({

    hallNo: { type: String, required: true },
    capacity: { type: Number, required: true },
    rollNoRange: {
        startRollNo: { type: String, required: true },
        endRollNo: { type: String, required: true },
    },
    available: { type: Boolean, default: true }
});

/*
PK : hallNo
*/
const HallCollection = mongoose.model("hall", HallSchema);
module.exports = HallCollection;