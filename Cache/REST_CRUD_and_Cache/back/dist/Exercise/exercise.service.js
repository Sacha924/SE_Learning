"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exerciseModel = require("./exercise.model");
exports.getAllExercises = (req, res) => {
    exerciseModel.find()
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json({ error }));
};
exports.createExercise = (req, res) => {
    console.log(req.body);
    exerciseModel
        .create(req.body)
        .then((result) => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({ msg: error }));
};
