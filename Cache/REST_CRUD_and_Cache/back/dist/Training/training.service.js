"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const trainingModel = require("./training.model");
const Exercise = require("./../Exercise/exercise.model");
exports.getAllTrainings = (req, res) => {
    trainingModel.find().populate("exercises") // This will replace exercise IDs with the actual exercise documents
        .then((result) => res.status(200).json(result))
        .catch((error) => {
        console.error(error);
        res.status(500).json({ error: error.message });
    });
};
exports.createTraining = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exerciseNames = req.body.exercises;
        const exercisesToAdd = [];
        for (const exerciseName of exerciseNames) {
            const exercise = yield Exercise.findOne({ name: exerciseName });
            if (!exercise) {
                return res.status(400).json({ message: `Exercise ${exerciseName} not found` });
            }
            exercisesToAdd.push(exercise._id);
        }
        const newTraining = yield trainingModel.create(Object.assign(Object.assign({}, req.body), { exercises: exercisesToAdd }));
        res.status(200).json(newTraining);
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
});
