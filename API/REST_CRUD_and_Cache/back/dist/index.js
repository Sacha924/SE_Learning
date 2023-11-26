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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const cors = require("cors");
require("dotenv").config();
const exerciseController = require("./Exercise/exercise.controller");
const trainingController = require("./Training/training.controller");
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());
app.use("/exercise", exerciseController);
app.use("/training", trainingController);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.set("strictQuery", true);
    yield mongoose_1.default.connect(process.env.MONGO_URI || '').then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
    app.listen(port, () => {
        console.log(`Example app listening on port 4000`);
    });
});
main();
