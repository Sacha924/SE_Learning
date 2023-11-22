const exerciseModel = require("./exercise.model")
import { Request, Response } from "express";

exports.getAllExercises = (req: Request, res: Response) => {
    exerciseModel.find()
        .then((result: any) => res.status(200).json(result))
        .catch((error: any) => res.status(500).json({ error }));
}

exports.createExercise = (req: Request, res: Response) => {
    exerciseModel
        .create(req.body)
        .then((result: any) => res.status(200).json({ result }))
        .catch((error: any) => res.status(500).json({ msg: error }));
}

exports.updateExercise = (req: Request, res: Response) => {
    exerciseModel
        .findOneAndUpdate({ name: req.body.name }, req.body.newEx, { new: true })
        .then((result: any) => res.status(200).json({ result }))
        .catch((error: any) => res.status(500).json({ msg: error }));
}

exports.deleteExercise = (req: Request, res: Response) => {
    exerciseModel
        .findOneAndDelete({ name: req.body.name })
        .then((result: any) => res.status(200).json({ result }))
        .catch((error: any) => res.status(500).json({ msg: error }));
}