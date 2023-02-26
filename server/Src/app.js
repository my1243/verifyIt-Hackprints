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

app.listen(PORT, () => {
    console.log(`Server listening on  http://127.0.0.1:${PORT}`);
});
