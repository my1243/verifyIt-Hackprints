const BranchCollection = require("../Src/Models/branch-schema");
const HallCollection = require("../Src/Models/hall-schema");
const StudentCollection = require("../Src/Models/student-schema");

module.exports = {
  createHall: async (req, res) => {
    try {
      let hall = await HallCollection.findOne({ hallNo: req.body.hallNo });
      if (hall !== null) {
        return res.status(200).send("already exist hall:");
      }

      hall = new HallCollection({
        hallNo: req.body.hallNo,
        capacity: req.body.capacity,
      });

      await hall.save();
      return res.status(200).send(hall);
    } catch (error) {
      return res.status(401).send(error);
    }
  },
  getHalls: async (req, res) => {
    try {
      let halls = await HallCollection.find({});
      return res.status(200).send(halls);
    } catch (error) {
      return res.status(401).send(error);
    }
  },
  updateHall: async (req, res) => {
    try {
      let hall = await HallCollection.findOne({ _id: req.body._id });
      if (hall === null) {
        return res.status(403).send("doesn't exist hall:)");
      }

      let tmpHall = await HallCollection.findOne({ hallNo: req.body.hallNo });
      if (tmpHall !== null) {
        return res
          .status(403)
          .send("already exist hall with hall-no :)" + req.body.hallNo);
      }
      tmpHall = null;

      hall.hallNo = req.body.hallNo;
      hall.capacity = req.body.capacity;
      let updatedHall = await hall.save();

      return res.status(200).send(updatedHall);
    } catch (error) {
      return res.status(401).send(error);
    }
  },
  deleteHall: async (req, res) => {
    try {
      let hall = await HallCollection.deleteOne({ hallNo: req.body.hallNo });
      return res.status(200).send(hall);
    } catch (error) {
      return res.status(401).send(error);
    }
  },
  getSpecificHall: async (req, res) => {
    try {
      let hall = await HallCollection.findOne({ _id: req.body._id.toString() });
      if (hall === null) {
        return res.status(403).send("doesn't exist hall:)");
      }

      return res.status(200).send(hall);
    } catch (error) {
      return res.status(401).send(error);
    }
  },
  deleteAllHalls: async (req, res) => {
    try {
      let result = await HallCollection.deleteMany({});
      return res.status(200).send(result);
    } catch (error) {
      return res.status(401).send(error);
    }
  },
  allocateHall: async (req, res) => {
    try {
      let hall = await HallCollection.findOne({ hallNo: req.body.hallNo });
      //   console.log(hall);
      if (hall === null) {
        return res.status(403).send("doesn't exist hall:)");
      }

      //to which branch assigned:)
      //   console.log(req.body);
      let branch = await BranchCollection.findOne({
        $and: [
          { branchId: req.body.branchId },
          { semester: req.body.semester },
        ],
      });
      if (branch === null) {
        return res
          .status(403)
          .send(
            "doesn't exist " +
              req.body.branchId +
              " branch for " +
              req.body.semester +
              " semester"
          );
      }
      // //branch available
      // if (!branch.available) {
      //     let hall = await HallCollection.findOne({ hallNo: req.body.hallNo });

      //     return res.status(200).send(
      //         "branch is already allocated to : " + hall.hallNo
      //     );
      // }
      // if (hall.available) {

      //check valid branch
      if (
        req.body.startRollNo.substring(0, 2) !==
        req.body.endRollNo.substring(0, 2)
      )
        return res
          .status(200)
          .send("invalid branch for start-roll-no & end-roll-no");

      //check range
      let range =
        parseInt(req.body.endRollNo.substring(2)) -
        parseInt(req.body.startRollNo.substring(2));

      if (range <= 0)
        return res
          .status(200)
          .send("end-roll-no must be greater than start-roll-no");
      if (range > hall.capacity)
        return res.status(200).send("#students are out of capacity:)");

      hall.rollNoRange.startRollNo = req.body.startRollNo;
      hall.rollNoRange.endRollNo = req.body.endRollNo;
      // hall.available = false;
      // hall.allocatedBranch = branch._id;
      // branch.available = false;

      let assignedHall = await hall.save();
      console.log("assignhall ", assignedHall);
      // return res.status(200).send(
      //     "branch assigned : " + branch.branchId + " , " + branch.semester +
      //     "\nRoll No : " + assignedHall.rollNoRange
      // );
      // }

      // // assigned branch
      // let assignedBranch = await BranchCollection.findOne({ _id: hall.allocatedBranch.toString() });
      // return res.status(200).send(
      //     "hall is already assigned to : " + assignedBranch.branchId +
      //     " , sem : " + assignedBranch.semester
      // );
      //allocate to stduents
      let students = await StudentCollection.find({
        branch: branch._id.toString(),
      });

      for (i = 0; i < students.length; i++) {
        let student = students[i];
        let rollNumber = parseInt(student.rollNo.substring(2));

        if (
          parseInt(req.body.startRollNo.substring(2)) <= rollNumber &&
          parseInt(req.body.endRollNo.substring(2)) >= rollNumber
        ) {
          student.hall = hall._id;
        }
        await student.save();
      }

      return res.status(200).send("hall assigned :)");
    } catch (error) {
      console.log(error);
      return res.status(401).send(error);
    }
  },
  deAllocateHall: async (req, res) => {
    try {
      let hall = await HallCollection.findOne({ hallNo: req.body.hallNo });
      if (hall === null) {
        return res.status(403).send("doesn't exist hall:)");
      }

      if (hall.available) {
        return res.status(200).send("hall doesn't assigned to any branch:)");
      }

      //assigned branch
      let assignedBranch = await BranchCollection.findOne({
        _id: hall.allocatedBranch.toString(),
      });
      assignedBranch.available = true;
      await assignedBranch.save();

      hall.allocatedBranch = null;
      hall.available = true;
      hall.rollNoRange.startRollNo = "XX000";
      hall.rollNoRange.endRollNo = "XX000";
      await hall.save();

      //allocate to stduents
      let students = await StudentCollection.find({
        branch: assignedBranch._id.toString(),
      });
      for (i = 0; i < students.length; i++) {
        let student = students[i];
        let rollNumber = parseInt(student.rollNo.substring(2));

        if (
          parseInt(req.body.startRollNo.substring(2)) <= rollNumber &&
          parseInt(req.body.endRollNo.substring(2)) >= rollNumber
        ) {
          student.hall = null;
        }
        await student.save();
      }

      return res.status(200).send("hall.available : " + hall.available);
    } catch (error) {
      return res.status(401).send(error);
    }
  },
};
