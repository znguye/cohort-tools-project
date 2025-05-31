const Cohort= require("../models/cohortModel");

const router = require("express").Router();

// CREATE A NEW COHORT
router.post("/", (req, res, next) => {
    Cohort
        .create({
            cohortSlug:req.body.cohortSlug,
            cohortName: req.body.cohortName,
            program: req.body.program,
            format: req.body.format,
            campus: req.body.campus, 
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            inProgress: req.body.inProgress,
            programManager: req.body.programMaster,
            leadTeacher: req.body.leadTeacher,
            totalHours: req.body.totalHours,
        })
        .then((createdCohort) => {
            res.status(201).json(createdCohort);
        })
        .catch((error) => {
            res.status(500).json({error: "Error while creating a new cohort"});
        })

})


// GET ALL COHORTS
router.get("/", (req, res, next) => {
    Cohort.find()
        .then((allCohorts) => {
            res.status(200).json(allCohorts);
        })
        .catch((err) => {
            res.status(500).json({error: "Error while retrieving cohorts"});
        })
})


// GET A COHORT BY ID
router.get("/:cohortId", (req, res, next) => {
    const cohortId = req.params.cohortId;
    Cohort.findById(cohortId)
        .then((cohort) => {
            res.status(200).json(cohort); 
        })
        .catch((error) => {
            res.status(500).json({error: "Error while retrieving a cohort by ID"});
        })
})

// UPDATE A COHORT BY ID
router.put("/:cohortId", (req, res, next) => {
    const cohortId = req.params.cohortId;

    Cohort.findByIdAndUpdate(cohortId, req.body, {new: true})
        .then((updatedCohort) => {
            res.status(200).json(updatedCohort);
        })
        .catch((error) => {
            res.status(500).json({error: "Error while updating cohort"});
        })
    
})


// DELETE A COHORT BY ID
router.delete("/:cohortId", (req, res, next) => {
    const studentId = req.params.cohortId;

    Cohort.findByIdAndDelete(cohortId)
        .then((result) => {
            res.status(204).send();
        })
        .catch((error) => {
            res.status(500).json({error: "Error while deleting cohort"});
        })
})

module.exports = router;