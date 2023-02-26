const BranchCollection = require("../Src/Models/branch-schema");
const FacultyCollection = require("../Src/Models/faculty-schema");
const StudentCollection = require("../Src/Models/student-schema");

module.exports = {

    createBranch: async (req, res) => {
        try {

            let branch = await BranchCollection.findOne({
                $and: [{ branchId: req.body.branchId }, { semester: req.body.semester }]
            });

            if (branch !== null) { return res.status(200).send("already exist branch:"); }

            branch = new BranchCollection({
                branchId: req.body.branchId,
                branchName: req.body.branchName,
                semester: req.body.semester,
                degree: req.body.degree
            });

            await branch.save();
            return res.status(200).send(branch);

        } catch (error) {
            return res.status(500).send(error);
        }
    },
    getBranches: async (req, res) => {
        try {
            let branches = await BranchCollection.find({});
            return res.status(200).send(branches);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    updateBranch: async (req, res) => {
        try {
            let branch = await BranchCollection.findOne({
                $and: [{ branchId: req.body.branchId }, { semester: req.body.semester }]
            });

            // already exist branch ?
            if (branch !== null && branch._id.toString() !== req.body._id) { return res.status(200).send("already exist branch:"); }

            branch.branchId = req.body.branchId;
            branch.branchName = req.body.branchName;
            branch.semester = req.body.semester;
            branch.degree = req.body.degree;


            let updatedBranch = await branch.save();
            return res.status(200).send(updatedBranch);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    deleteBranch: async (req, res) => {
        try {

            // faculty
            let faculties = await FacultyCollection.find({});
            for (i = 0; i < faculties.length; i++) {

                if (faculties[i].branch.toString() === req.body._id) {
                    faculties[i].branch = null;
                    await faculties[i].save();
                }
            }

            //student
            let students = await StudentCollection.find({});
            for (i = 0; i < students.length; i++) {

                if (students[i].branch.toString() === req.body._id) {
                    students[i].branch = null;
                    await students[i].save();
                }
            }

            //exam-schedule

            let result = await BranchCollection.deleteOne({ _id: req.body._id });
            return res.status(200).send(result);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    deleteAllBranches: async (req, res) => {
        try {
            let result = await BranchCollection.deleteMany({});
            return res.status(200).send(result);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    getSpecificBranch: async (req, res) => {
        try {
            let branch = await BranchCollection.findOne({
                $and: [{ branchId: req.body.branchId }, { semester: req.body.semester }]
            });

            return res.status(200).send(branch);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    createSubject: async (req, res) => {
        try {
            let branch = await BranchCollection.findOne({ _id: req.body._id });

            if (branch === null)
                return res.status(403).send("doesn't exist " + req.body.branchId + " branch for " + req.body.semester + " semester");

            for (i = 0; i < branch.subjects.length; i++) {
                if (branch.subjects[i].subjectCode === req.body.subjectCode)
                    return res.status(200).send("already exist subject:");
            }

            branch.subjects.push({
                subjectCode: req.body.subjectCode,
                subjectName: req.body.subjectName,
            });
            await branch.save();

            return res.status(200).send(branch.subjects);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    getSubjects: async (req, res) => {
        try {
            let subjects = await BranchCollection.find({}).select({ subjects: 1 });
            return res.status(200).send(subjects);
        }
        catch (error) {
            return res.status(401).send(error);
        }
    },
    updateSubject: async (req, res) => {
        try {

            let branch = await BranchCollection.findOne({
                $and: [{ branchId: req.body.branchId }, { semester: req.body.semester }]
            });
            if (branch === null)
                return res.status(403).send("doesn't exist " + req.body.branchId + " branch for " + req.body.semester + " semester");

            // already exist subject ?
            for (i = 0; i < branch.subjects.length; i++) {
                if (branch.subjects[i].subjectCode === req.body.updatedSubjectCode) {
                    return res.status(200).send("already exist subject:");
                }
            }

            //update
            for (i = 0; i < branch.subjects.length; i++) {

                if (branch.subjects[i].subjectCode === req.body.subjectCode) {
                    branch.subjects[i].subjectCode = req.body.updatedSubjectCode;
                    branch.subjects[i].subjectName = req.body.updatedSubjectName;
                    await branch.save();

                    return res.status(200).send(branch.subjects[i]);
                }
            }
            return res.status(403).send("doesn't exist this " + req.body.subjectCode + " subject:)");

        }
        catch (error) {
            return res.status(401).send(error);
        }
    },
    deleteSubject: async (req, res) => {
        try {
            let branch = await BranchCollection.findOne({
                $and: [{ branchId: req.body.branchId }, { semester: req.body.semester }]
            });

            if (branch === null)
                return res.status(403).send("doesn't exist " + req.body.branchId + " branch for " + req.body.semester + " semester");

            for (i = 0; i < branch.subjects.length; i++) {

                if (branch.subjects[i].subjectCode === req.body.subjectCode) {
                    branch.subjects.splice(i, 1);
                    await branch.save();

                    return res.status(200).send("delete subject : " + req.body.subjectCode);
                }
            }
            return res.status(403).send("doesn't exist this " + req.body.subjectCode + " subject:)");
        }
        catch (error) {
            return res.status(401).send(error);
        }
    },
    getSpecificSubject: async (req, res) => {
        try {
            let branch = await BranchCollection.findOne({
                $and: [{ branchId: req.body.branchId }, { semester: req.body.semester }]
            });

            if (branch === null)
                return res.status(403).send("doesn't exist " + req.body.branchId + " branch for " + req.body.semester + " semester");

            for (i = 0; i < branch.subjects.length; i++) {

                if (branch.subjects[i].subjectCode === req.body.subjectCode) {
                    return res.status(200).send(branch.subjects[i]);
                }
            }

            return res.status(403).send("doesn't exist this " + req.body.subjectCode + " subject:)");
        }
        catch (error) {
            return res.status(401).send(error);
        }
    },
    getSubjectsBasedOnBranch: async (req, res) => {
        try {

            let branch = await BranchCollection.findOne({
                $and: [{ branchId: req.body.branchId }, { semester: req.body.semester }]
            });

            if (branch === null)
                return res.status(403).send("doesn't exist " + req.body.branchId + " branch for " + req.body.semester + " semester");

            return res.status(200).send(branch.subjects);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    deleteAllSubjects: async (req, res) => {
        try {
            let branch = await BranchCollection.findOne({
                $and: [{ branchId: req.body.branchId }, { semester: req.body.semester }]
            });

            if (branch === null)
                return res.status(403).send("doesn't exist " + req.body.branchId + " branch for " + req.body.semester + " semester");

            branch.subjects = [];
            await branch.save();

            return res.status(200).send(branch.subjects);

        } catch (error) {
            return res.status(401).send(error);
        }
    }
};