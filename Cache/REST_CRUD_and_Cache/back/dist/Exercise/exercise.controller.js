"use strict";
const router = require("express").Router();
const exerciseService = require("./exercise.service");
router.get("/", exerciseService.getAllExercises);
router.post("/", exerciseService.createExercise);
module.exports = router;
