const BranchCollection = require("../Src/Models/branch-schema");
const ExamScheduleCollection = require("../Src/Models/exam-schedule-schema");
const FacultyCollection = require("../Src/Models/faculty-schema");
const HallCollection = require("../Src/Models/hall-schema");
const moment = require("moment");

module.exports = {
  createExamSchedule: async (req, res) => {
    try {
      //branch
      let branch = await BranchCollection.findOne({
        $and: [
          { branchId: req.body.branchId },
          { semester: req.body.semester },
        ],
      });
      if (branch === null) {
        return res.status(403).send("doesn't exist branch:)");
      }

      //faculty
      let faculty = await FacultyCollection.findOne({ fId: req.body.fid });
      if (faculty === null) {
        return res.status(403).send("doesn't exist faculty:)");
      }

      //hallNo
      let hall = await HallCollection.findOne({ hallNo: req.body.hallNo });
      if (hall === null) {
        return res.status(403).send("doesn't exist hall:)");
      }

      //subjectId
      let subject = null;
      for (i = 0; i < branch.subjects.length; i++) {
        if (branch.subjects[i].subjectCode === req.body.subjectCode) {
          subject = branch.subjects[i];
          break;
        }
      }

      if (subject === null) {
        return res.status(403).send("doesn't exist subject:)");
      }

      let examStartTime = req.body.examStartTime.toString();
      let examEndTime = req.body.examEndTime.toString();
      let examDate = moment(examStartTime).format("DD-MM-YYYY");
      let examYear = examDate.substring(6);

      let examSchedule = await ExamScheduleCollection.findOne({
        $and: [
          { examDate: examDate },
          { subject: subject._id },
          { branch: branch._id },
        ],
      });

      if (examSchedule !== null) {
        return res.status(200).send("exam-schedule already exist :)");
      }

      examSchedule = new ExamScheduleCollection({
        examName: req.body.examName,
        examDate: examDate,
        examYear: examYear,
        examStartTime: examStartTime,
        examEndTime: examEndTime,
        branch: branch._id,
        hall: hall._id,
        faculty: faculty._id,
        subject: subject._id,
      });

      await examSchedule.save();

      branch.allotments.push({ allotment: examSchedule._id });
      faculty.allotments.push({ allotment: examSchedule._id });
      subject.allotments.push({ allotment: examSchedule._id });
      hall.allotments.push({ allotment: examSchedule._id });

      await branch.save();
      await faculty.save();
      await subject.save();
      await hall.save();

      return res.status(200).send(examSchedule);
    } catch (error) {
      return res.status(401).send(error);
    }
  },
  getExamSchedules: async (req, res) => {
    try {
      let examSchedules = await ExamScheduleCollection.find({});
      return res.status(200).send(examSchedules);
    } catch (error) {
      return res.status(401).send(error);
    }
  },
  updateExamSchedule: async (req, res) => {
    try {
      //branch
      let branch = await BranchCollection.findOne({
        $and: [
          { branchId: req.body.branchId },
          { semester: req.body.semester },
        ],
      });
      if (branch === null) {
        return res.status(403).send("doesn't exist branch:)");
      }

      //faculty
      let faculty = await FacultyCollection.findOne({ fId: req.body.fid });
      if (faculty === null) {
        return res.status(403).send("doesn't exist faculty:)");
      }

      //hallNo
      let hall = await HallCollection.findOne({ hallNo: req.body.hallNo });
      if (hall === null) {
        return res.status(403).send("doesn't exist hall:)");
      }

      //subjectId
      let subject = null;
      for (i = 0; i < branch.subjects.length; i++) {
        if (branch.subjects[i].subjectCode === req.body.subjectCode) {
          subject = branch.subjects[i];
          break;
        }
      }

      if (subject === null) {
        return res.status(403).send("doesn't exist subject:)");
      }

      let examStartTime = req.body.examStartTime.toString();
      let examEndTime = req.body.examEndTime.toString();
      let examDate = moment(examStartTime).format("DD-MM-YYYY");
      let examYear = examDate.substring(6);

      let examSchedule = await ExamScheduleCollection.findOne({
        _id: req.body._id,
      });

      //remove allocation-id if new comes
      let tmpBranch = await BranchCollection.findOne({
        _id: examSchedule.branch.toString(),
      });
      if (examSchedule.branch._id.toString() !== branch._id.toString()) {
        let remainAllotments = tmpBranch.allotments.filter(
          (currentAllotment) => {
            return (
              currentAllotment.allotment.toString() !==
              examSchedule._id.toString()
            );
          }
        );

        tmpBranch.allotments = remainAllotments;
        branch.allotments.push({ allotment: examSchedule._id });

        await tmpBranch.save();
        await branch.save();

        examSchedule.branch = branch._id;
      }
      //for subject remain

      if (examSchedule.faculty._id.toString() !== faculty._id.toString()) {
        let tmpFaculty = await FacultyCollection.findOne({
          _id: examSchedule.faculty.toString(),
        });

        let remainAllotments = tmpFaculty.allotments.filter(
          (currentAllotment) => {
            return (
              currentAllotment.allotment.toString() !==
              examSchedule._id.toString()
            );
          }
        );

        tmpFaculty.allotments = remainAllotments;
        faculty.allotments.push({ allotment: examSchedule._id });

        await tmpFaculty.save();
        await faculty.save();

        examSchedule.faculty = faculty._id;
      }

      if (examSchedule.hall._id.toString() !== hall._id.toString()) {
        let tmpHall = await HallCollection.findOne({
          _id: examSchedule.hall.toString(),
        });

        let remainAllotments = tmpHall.allotments.filter((currentAllotment) => {
          return (
            currentAllotment.allotment.toString() !==
            examSchedule._id.toString()
          );
        });

        tmpHall.allotments = remainAllotments;
        hall.allotments.push({ allotment: examSchedule._id });

        await tmpHall.save();
        await hall.save();

        examSchedule.hall = hall._id;
      }

      examSchedule.examName = req.body.examName;
      examSchedule.examDate = examDate;
      examSchedule.examYear = examYear;
      examSchedule.examStartTime = examStartTime;
      examSchedule.examEndTime = examEndTime;

      await examSchedule.save();

      return res.status(200).send(examSchedule);
    } catch (error) {
      return res.status(401).send(error);
    }
  },
  deleteExamSchedule: async (req, res) => {
    try {
      let examSchedule = await ExamScheduleCollection.deleteOne({
        _id: req.body._id,
      });
      return res.status(200).send(examSchedule);
    } catch (error) {
      return res.status(401).send(error);
    }
  },
  getExamSchedulesByBranch: async (req, res) => {
    try {
      //branch
      let branch = await BranchCollection.findOne({
        $and: [
          { branchId: req.body.branchId },
          { semester: req.body.semester },
        ],
      });
      if (branch === null) {
        return res.status(403).send("doesn't exist branch:)");
      }

      let examSchedule = await ExamScheduleCollection.findOne({
        branch: branch._id,
      });

      return res.status(200).send(examSchedule);
    } catch (error) {
      return res.status(401).send(error);
    }
  },
  deleteAllExamSchedules: async (req, res) => {
    try {
      let result = await ExamScheduleCollection.deleteMany({});
      return res.status(200).send(result);
    } catch (error) {
      return res.status(401).send(error);
    }
  },
};
