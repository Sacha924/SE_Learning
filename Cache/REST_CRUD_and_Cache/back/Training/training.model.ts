// contain the Mongoose model that define the structure of an Exercise in the MongoDB database

import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    date: { type: Date },
    exercises: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Exercise' 
    }]
})
/// j'utilise un nom plutot que l'id puisque l'utilisateur final se servira du nom dans le frontend pour créer un training et lui relier ces exercices
/// L'utilisateur final ne connaît pas les id des exos créées. On privilégie le use case à la performance qui pourrait être optimale avec un id.

const Training = mongoose.model("training", trainingSchema); // so exercise is the name of my collection on the DB

module.exports = Training;
