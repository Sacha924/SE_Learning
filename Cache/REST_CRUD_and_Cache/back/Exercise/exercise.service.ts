const exerciseModel = require("./exercise.model")
import { Request, Response } from "express";

exports.getAllExercises = (req: Request, res: Response) => {
    exerciseModel.find()
        .then((result: any) => res.status(200).json(result))
        .catch((error: any) => res.status(500).json({ error }));
}

exports.createExercise = (req: Request, res: Response) => {
    console.log(req.body)
    exerciseModel
    .create(req.body)
    .then((result: any) => res.status(200).json({ result }))
    .catch((error: any) => res.status(500).json({ msg: error }));
}