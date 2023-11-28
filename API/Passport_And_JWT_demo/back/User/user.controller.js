const router = require("express").Router();
const userService = require("./user.service");
const passport = require("passport");


router.post("/register", userService.registerUser);

router.post("/login", userService.loginUser);

module.exports = router;