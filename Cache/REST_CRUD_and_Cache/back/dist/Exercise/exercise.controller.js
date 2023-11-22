"use strict";
const exerciseRouter = require("express").Router();
const exerciseService = require("./exercise.service");
exerciseRouter.get("/", exerciseService.getAllExercises);
exerciseRouter.post("/", exerciseService.createExercise);
exerciseRouter.put("/", exerciseService.updateExercise);
exerciseRouter.delete("/", exerciseService.deleteExercise);
module.exports = exerciseRouter;
