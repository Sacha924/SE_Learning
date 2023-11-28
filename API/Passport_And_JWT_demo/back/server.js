const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const passport = require("passport")
const session = require("express-session");
require("dotenv").config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

const userRouter = require("./User/user.controller");
app.use("/user", userRouter);


const main = async () => {
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.MONGO_URI || '').then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

    app.listen(port, () => {
        console.log(`Example app listening on port 4000`);
    });
};
main();
