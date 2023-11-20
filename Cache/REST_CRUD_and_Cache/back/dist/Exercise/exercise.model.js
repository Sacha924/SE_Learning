"use strict";
// contain the Mongoose model that define the structure of an Exercise in the MongoDB database
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const exerciseSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true }
});
const Exercise = mongoose_1.default.model("exercise", exerciseSchema); // so exercise is the name of my collection on the DB
module.exports = Exercise;
