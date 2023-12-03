const router = require("express").Router();
const userService = require("./user.service");
const passport = require("passport");
require("../auth/local.strategy");


router.post("/register", userService.registerUser);

router.post("/login", passport.authenticate("local"), (req, res) => {
    if (req.user) {
        res.json({ success: true, user: req.user });
    } else {
        res.status(401).json({ success: false, message: 'Échec de l’authentification' });
    }
});

module.exports = router;