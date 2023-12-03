// contain the Mongoose model that define the structure of a user in the MongoDB database

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  facebookId: { type: String, unique: true },
  username: { type: String, unique: true, unique: true },
  password: { type: String },
});

const User = mongoose.model("users", userSchema);
module.exports = User;