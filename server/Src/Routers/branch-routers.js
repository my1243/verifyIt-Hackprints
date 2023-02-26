const express = require('express');
const router = express.Router();


//controllers
const {
    createBranch,
    getBranches,
    getSpecificBranch,
    updateBranch,
    deleteBranch,
    deleteAllBranches,

    createSubject,
    getSubjects,
    getSpecificSubject,
    getSubjectsBasedOnBranch,
    updateSubject,
    deleteSubject,
    deleteAllSubjects

} = require("../../Controllers/branch-cntrl");

router.post("/create-branch", createBranch);
router.post("/get-branchs", getBranches);
router.post("/get-specific-branch", getSpecificBranch);
router.patch("/update-branch", updateBranch);
router.delete("/delete-branch", deleteBranch);
router.delete("/delete-all-branches", deleteAllBranches);

router.post("/create-subject", createSubject);
router.post("/get-subjects", getSubjects);
router.post("/get-specific-subject", getSpecificSubject);
router.post("/get-subject-based-on-branch", getSubjectsBasedOnBranch);
router.patch("/update-subject", updateSubject);
router.delete("/delete-subject", deleteSubject);
router.delete("/delete-all-subjects", deleteAllSubjects);


module.exports = router;