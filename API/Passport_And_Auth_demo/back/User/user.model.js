// contain the Mongoose model that define the structure of a user in the MongoDB database

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("users", userSchema);
module.exports = User;