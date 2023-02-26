const {
	ddu_id_formate_check,
	verify_roll_no,
} = require("../Src/Helpers/student-helpers");
const BranchCollection = require("../Src/Models/branch-schema");
const StudentCollection = require("../Src/Models/student-schema");

module.exports = {
	createStudent: async (req, res) => {
		try {
			let student = await StudentCollection.findOne({
				studentId: req.body.studentId,
			});
			if (student !== null)
				return res.status(200).send("already exist student:)");

			student = await StudentCollection.findOne({ rollNo: req.body.rollNo });
			if (student !== null)
				return res
					.status(200)
					.send("student already exist with rollNO :)" + req.body.rollNo);

			let branch = await BranchCollection.findOne({
				$and: [
					{ branchId: req.body.branchId },
					{ semester: req.body.semester },
				],
			});
			if (branch === null)
				return res.status(200).send("branch doesn't exist :)");

			//verify student id
			// if (!ddu_id_formate_check(req.body.studentId.toUpperCase()))
			// 	return res.status(200).send("invalid student-id:)");

			//verify roll NO
			// if (!verify_roll_no(req.body.rollNo.toUpperCase()))
			// 	return res.status(200).send("invalid rollNo:)");

			student = new StudentCollection({
				studentId: req.body.studentId,
				fname: req.body.fname,
				lname: req.body.lname,
				rollNo: req.body.rollNo,
				branch: branch._id,
				semester: req.body.semester,
				feeStatus: req.body.feeStatus,
				clg: req.body.clg,
			});
			if (req.body.img !== "" && req.body.img !== undefined)
				student.img = req.body.img;

			const savedStudent = await student.save();
			return res.status(200).send(savedStudent);
		} catch (error) {
			console.log(error);
			return res.status(401).send(error);
		}
	},
	getStudents: async (req, res) => {
		try {
			let students = await StudentCollection.find({});
			return res.status(200).send(students);
		} catch (error) {
			return res.status(401).send(error);
		}
	},
	updateStudent: async (req, res) => {
		try {
			let student = await StudentCollection.findOne({
				studentId: req.body.studentId,
			});
			if (student !== null && student._id.toString() !== req.body._id)
				return res
					.status(200)
					.send("student already exist with Id :)" + req.body.studentId);

			student = await StudentCollection.findOne({ rollNo: req.body.rollNo });
			if (student !== null && student._id.toString() !== req.body._id)
				return res
					.status(200)
					.send("student already exist with rollNO :)" + req.body.rollNo);

			let branch = await BranchCollection.findOne({
				$and: [
					{ branchId: req.body.branchId },
					{ semester: req.body.semester },
				],
			});
			if (branch === null)
				return res.status(200).send("branch doesn't exist :)");

			//verify student id
			if (!ddu_id_formate_check(req.body.studentId.toUpperCase()))
				return res.status(200).send("invalid student-id:)");

			//verify roll NO
			if (!verify_roll_no(req.body.rollNo.toUpperCase()))
				return res.status(200).send("invalid rollNo:)");

			student = await StudentCollection.findOne({ _id: req.body._id });

			student.studentId = req.body.studentId;
			student.name = req.body.name;
			student.rollNo = req.body.rollNo;
			student.branch = branch._id;
			student.semester = req.body.semester;
			student.clg = req.body.clg;

			if (req.body.img !== "" && req.body.img !== undefined)
				student.img = req.body.img;

			await student.save();
			return res.status(200).send(student);
		} catch (error) {
			return res.status(401).send(error);
		}
	},
	deleteStudent: async (req, res) => {
		try {
			let result = await StudentCollection.deleteOne({ _id: req.body._id });
			return res.status(200).send(result);
		} catch (error) {
			return res.status(401).send(error);
		}
	},
	getSpecificStudent: async (req, res) => {
		try {
			let student = await StudentCollection.findOne({
				studentId: req.body.studentId,
			});
			return res.status(200).send(student);
		} catch (error) {
			return res.status(401).send(error);
		}
	},
	deleteAllStudents: async (req, res) => {
		try {
			let result = await StudentCollection.deleteMany({});
			return res.status(200).send(result);
		} catch (error) {
			return res.status(401).send(error);
		}
	},
};
