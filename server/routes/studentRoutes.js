const Student = require("../models/studentsModel");

const router = require("express").Router();

// GET ALL STUDENTS
router.get("/api/students", (req, res, next) => {
    Student.find()
        // .populate('')
        .then((allStudents) => {
            res.status(200).json(allStudents);
        })
        .catch((err) => {
            res.status(500).json({error: "Error while retrieving students"});
        })
})


// GET STUDENT BY ID
router.get("/api/students/:studentId", (req, res, next) => {
    const studentId = req.params.studentId;
    Student.findById(studentId)
        .then((student) => {
            res.status(200).json(student);
        })
        .catch((error) => {
            res.status(500).json({error: "Error while retrieving a student by ID"});
        })
})


// GET ALL STUDENTS BY COHORT
router.get("/api/students/cohort/:cohortId", (req, res, next) => {
    const cohortId = req.params.cohortId; 
    
    Student.find({cohortId})
        .then((students) => {
            res.status(200).json(students);
        })
        .catch((error) => {
            res.status(500).json({error: "Error while retrieving all students by cohort ID"});
        })
})


// CREATE A NEW STUDENT
router.post("/api/students", (req, res, next) => {
    Student
        .create({
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            email: req.body.email,
            phone: req.body.phone, 
            linkedinUrl: req.body.linkedinUrl, 
            languages: req.body.languages, 
            program: req.body.program,
            background: req.body.background, 
            image: req.body.image,
            cohort: req.body.cohort,
            projects: req.body.projects,
        })
        .then((createdStudent) => {
            res.status(201).json(createdStudent);
        })
        .catch((error) => {
            res.status(500).json({error: "Error while creating a new student"});
        })

})


// UPDATE STUDENT BY ID
router.put("/api/students/:studentId", (req, res, next) => {
    const studentId = req.params.id;

    Student.findByIdAndUpdate(studentId, req.body, {new: true})
        .then((updatedStudent) => {
            res.status(200).json(updatedStudent);
        })
        .catch((error) => {
            res.status(500).json({error: "Error while updating student"});
        })
    
})


// DELETE STUDENT BY ID
router.delete("/api/students/:studentId", (req, res, next) => {
    const studentId = req.params.id;

    Student.findByIdAndDelete(studentId)
        .then((result) => {
            res.status(204).send();
        })
        .catch((error) => {
            res.status(500).json({error: "Error while deleting student"});
        })
})


module.exports = router;