const express = require('express');
const app = express();
const body_parser = require("body-parser");
const PORT = process.env.PORT || 3000;
require("./DB/connection");


//middlewares used--------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(body_parser.urlencoded({ extended: false }));


//routers
const branch_routers = require('./Routers/branch-routers');
const hall_routers = require('./Routers/hall-routers');
const student_router = require('./Routers/student-router');
const faculty_routers = require('./Routers/faculty-routers');
const exam_schedule_routers = require('./Routers/exam-schedule-routers');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//branches
app.post("/create-branch", branch_routers);
app.post("/get-branchs", branch_routers);
app.post("/get-specific-branch", branch_routers);
app.patch("/update-branch", branch_routers);
app.delete("/delete-branch", branch_routers);
app.delete("/delete-all-branches", branch_routers);

app.post("/create-subject", branch_routers);
app.post("/get-subjects", branch_routers);
app.post("/get-specific-subject", branch_routers);
app.post("/get-subject-based-on-branch", branch_routers);
app.patch("/update-subject", branch_routers);
app.delete("/delete-subject", branch_routers);
app.delete("/delete-all-subjects", branch_routers);

//halls
app.post("/create-hall", hall_routers);
app.post("/get-halls", hall_routers);
app.post("/get-specific-hall", hall_routers);
app.patch("/update-hall", hall_routers);
app.delete("/delete-hall", hall_routers);
app.delete("/delete-all-halls", hall_routers);

app.post("/allocate-hall", hall_routers);
app.post("/deallocate-hall", hall_routers);

//student
app.post("/create-student", student_router);
app.post("/get-students", student_router);
app.post("/get-specific-student", student_router);
app.patch("/update-student", student_router);
app.delete("/delete-student", student_router);
app.delete("/delete-all-studentes", student_router);


// faculty
app.post("/create-faculty", faculty_routers);
app.post("/get-faculties", faculty_routers);
app.post("/get-specific-faculty", faculty_routers);
app.patch("/update-faculty", faculty_routers);
app.delete("/delete-faculty", faculty_routers);
app.delete("/delete-all-faculties", faculty_routers);

//exam-schedule

app.post("/create-exam-schedule", exam_schedule_routers);
app.post("/get-exam-schedules", exam_schedule_routers);
app.patch("/update-exam-schedule", exam_schedule_routers);
app.delete("/delete-exam-schedule", exam_schedule_routers);
app.post("/get-specific-exam-schedule", exam_schedule_routers);
app.delete("/delete-all-exam-schedulees", exam_schedule_routers);


app.listen(PORT, () => {
    console.log(`Server listening on  http://127.0.0.1:${PORT}`);
});
