"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exerciseModel = require("./exercise.model");
exports.getAllExercises = (req, res) => {
    exerciseModel.find()
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json({ error }));
};
exports.createExercise = (req, res) => {
    exerciseModel
        .create(req.body)
        .then((result) => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({ msg: error }));
};
exports.updateExercise = (req, res) => {
    exerciseModel
        .findOneAndUpdate({ name: req.body.name }, req.body.newEx, { new: true })
        .then((result) => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({ msg: error }));
};
exports.deleteExercise = (req, res) => {
    exerciseModel
        .findOneAndDelete({ name: req.body.name })
        .then((result) => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({ msg: error }));
};
