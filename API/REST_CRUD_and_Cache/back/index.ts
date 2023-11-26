const express = require("express");
import mongoose from "mongoose";
const cors = require("cors");
require("dotenv").config();

const exerciseController = require("./Exercise/exercise.controller")
const trainingController = require("./Training/training.controller")


const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use("/exercise", exerciseController);
app.use("/training", trainingController);


const main = async () => {
  mongoose.set("strictQuery", true);

  await mongoose.connect(process.env.MONGO_URI||'').then(() => {
    console.log('Connected to MongoDB');
  }).catch((error: any) => {
    console.error('Error connecting to MongoDB:', error);
  });

  app.listen(port, () => {
    console.log(`Example app listening on port 4000`);
  });
};
main();
