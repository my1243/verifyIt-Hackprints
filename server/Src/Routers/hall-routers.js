const express = require('express');
const router = express.Router();


//controllers
const {
    createHall,
    getHalls,
    getSpecificHall,
    updateHall,
    deleteHall,
    deleteAllHalls,

    allocateHall,
    deAllocateHall,

} = require("../../Controllers/hall-cntrl");

router.post("/create-hall", createHall);
router.post("/get-halls", getHalls);
router.post("/get-specific-hall", getSpecificHall);
router.patch("/update-hall", updateHall);
router.delete("/delete-hall", deleteHall);
router.delete("/delete-all-halls", deleteAllHalls);

router.post("/allocate-hall", allocateHall);
router.post("/deallocate-hall", deAllocateHall);


module.exports = router;