const trainingModel = require("./training.model")
const Exercise = require("./../Exercise/exercise.model");

import { Request, Response } from "express";

exports.getAllTrainings = (req: Request, res: Response) => {
    trainingModel.find().populate("exercises") // This will replace exercise IDs with the actual exercise documents
        .then((result: any) => res.status(200).json(result))
        .catch((error: { message: any; }) => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
}

exports.createTraining = async (req: Request, res: Response) => {
    try {
        const exerciseNames = req.body.exercises;
        const exercisesToAdd = [];

        for (const exerciseName of exerciseNames) {
            const exercise = await Exercise.findOne({ name: exerciseName });
            if (!exercise) {
                return res.status(400).json({ message: `Exercise ${exerciseName} not found` });
            }
            exercisesToAdd.push(exercise._id);
        }

        const newTraining = await trainingModel.create({
            ...req.body,
            exercises: exercisesToAdd,
        });
        res.status(200).json(newTraining);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}
