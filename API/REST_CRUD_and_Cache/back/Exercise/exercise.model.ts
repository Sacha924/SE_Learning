// contain the Mongoose model that define the structure of an Exercise in the MongoDB database

import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;