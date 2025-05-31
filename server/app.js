const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 5005;
const mongoose = require("mongoose");
const Cohort = require("./models/cohortModel.js");
const Student = require("./models/studentsModel.js");
const cohortRoute = require("./routes/cohortRoutes.js");
const studentRoute = require("./routes/studentRoutes.js");

mongoose
  .connect("mongodb+srv://sami:Test123@cluster0.wrha9qb.mongodb.net/")
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to mongo", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
// const cohorts = require("./data/cohorts.json");
// const students = require("./data/students.json");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.use("/api/cohorts", cohortRoute);

app.use("/api/students", studentRoute);


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});