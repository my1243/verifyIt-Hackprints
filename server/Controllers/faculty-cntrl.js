const BranchCollection = require("../Src/Models/branch-schema");
const FacultyCollection = require("../Src/Models/faculty-schema");

module.exports = {

    createFaculty: async (req, res) => {
        try {
            let faculty = await FacultyCollection.findOne({ fId: req.body.fId });
            if (faculty !== null) return res.status(200).send("already exist faculty:)" + req.body.fId);

            faculty = await FacultyCollection.findOne({ fShortName: req.body.fShortName });
            if (faculty !== null) return res.status(200).send("already exist faculty with :)" + req.body.fShortName);

            let branch = await BranchCollection.findOne({
                $and: [{ branchId: req.body.branchId }, { semester: req.body.semester }]
            });
            if (branch === null) return res.status(200).send("branch doesn't exist :)");

            faculty = new FacultyCollection({
                fId: req.body.fId,
                fShortName: req.body.fShortName,
                fName: req.body.fName,
                branch: branch._id,
            });

            await faculty.save();
            return res.status(200).send(faculty);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    getFaculties: async (req, res) => {
        try {
            let faculties = await FacultyCollection.find({});
            return res.status(200).send(faculties);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    updateFaculty: async (req, res) => {
        try {
            let faculty = await FacultyCollection.findOne({ fId: req.body.fId });
            if (faculty !== null && faculty._id.toString() !== req.body._id) return res.status(200).send("already exist faculty:)" + req.body.fId);

            faculty = await FacultyCollection.findOne({ fShortName: req.body.fShortName });
            if (faculty !== null && faculty._id.toString() !== req.body._id) return res.status(200).send("already exist faculty with :)" + req.body.fShortName);

            let branch = await BranchCollection.findOne({
                $and: [{ branchId: req.body.branchId }, { semester: req.body.semester }]
            });
            if (branch === null) return res.status(200).send("branch doesn't exist :)");

            faculty = await FacultyCollection.findOne({ _id: req.body._id });
            faculty.fId = req.body.fId;
            faculty.fShortName = req.body.fShortName;
            faculty.fName = req.body.fName;
            faculty.branch = branch._id;

            await faculty.save();
            return res.status(200).send(faculty);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    deleteFaculty: async (req, res) => {
        try {
            let result = await FacultyCollection.deleteOne({ _id: req.body._id });
            return res.status(200).send(result);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    getSpecificFaculty: async (req, res) => {
        try {
            let faculty = await FacultyCollection.findOne({ fId: req.body.fId });
            if (faculty === null) return res.status(200).send("faculty doesn't exist :)");

            return res.status(200).send(faculty);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    deleteAllFaculties: async (req, res) => {
        try {
            let result = await FacultyCollection.deleteMany();
            return res.status(200).send(result);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
};