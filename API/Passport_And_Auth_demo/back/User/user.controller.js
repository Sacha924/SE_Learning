const router = require("express").Router();
const userService = require("./user.service");
const passport = require("passport");
require("../auth/local.strategy");
require("../auth/facebook.strategy")


router.post("/register", userService.registerUser);

router.post("/login", passport.authenticate("local"), (req, res) => {
    if (req.user) {
        res.json({ success: true, user: req.user });
    } else {
        res.status(401).json({ success: false, message: 'Échec de l’authentification' });
    }
});

router.get('/login/facebook', passport.authenticate('facebook')
    , (req, res) => {
        if (req.user) {
            res.json({ success: true, user: req.user });
        } else {
            res.status(401).json({ success: false, message: 'Échec de l’authentification' });
        }
    }
);

router.get('/login/facebook/callback', passport.authenticate('facebook', { 
    successRedirect: 'http://localhost:3000/main', 
    failureRedirect: '/login' 
  }));



module.exports = router;