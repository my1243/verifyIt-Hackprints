const express = require('express');
const router = express.Router();


//controllers
const {
    createFaculty,
    getFaculties,
    getSpecificFaculty,
    updateFaculty,
    deleteFaculty,
    deleteAllFaculties

} = require("../../Controllers/faculty-cntrl");

router.post("/create-faculty", createFaculty);
router.post("/get-faculties", getFaculties);
router.post("/get-specific-faculty", getSpecificFaculty);
router.patch("/update-faculty", updateFaculty);
router.delete("/delete-faculty", deleteFaculty);
router.delete("/delete-all-faculties", deleteAllFaculties);

module.exports = router;