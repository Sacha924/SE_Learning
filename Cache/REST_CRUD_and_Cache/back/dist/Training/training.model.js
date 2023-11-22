"use strict";
// contain the Mongoose model that define the structure of an Exercise in the MongoDB database
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Exercise = require("./../Exercise/exercise.model");
const trainingSchema = new mongoose_1.default.Schema({
    name: { type: String, require: true, unique: true },
    date: { type: Date },
    exercises: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Exercise'
        }]
});
/// j'utilise un nom plutot que l'id puisque l'utilisateur final se servira du nom dans le frontend pour créer un training et lui relier ces exercices
/// L'utilisateur final ne connaît pas les id des exos créées. On privilégie le use case à la performance qui pourrait être optimale avec un id.
const Training = mongoose_1.default.model("training", trainingSchema); // so exercise is the name of my collection on the DB
module.exports = Training;
