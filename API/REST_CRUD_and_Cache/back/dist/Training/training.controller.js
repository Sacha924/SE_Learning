"use strict";
const trainingRouter = require("express").Router();
const trainingService = require("./training.service");
trainingRouter.get("/", trainingService.getAllTrainings);
trainingRouter.post("/", trainingService.createTraining);
module.exports = trainingRouter;
