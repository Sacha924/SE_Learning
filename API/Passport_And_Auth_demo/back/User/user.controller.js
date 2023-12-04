const router = require("express").Router();
const userService = require("./user.service");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../auth/local.strategy");
require("../auth/facebook.strategy")
require("../auth/jwt.strategy");


router.post("/register", userService.registerUser);

router.post("/login", passport.authenticate("local"), (req, res) => {
    if (req.user) {
        const token = jwt.sign({ sub: req.user.id }, process.env.JWT_SECRET);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // use secure in production
            sameSite: 'strict',
        });
        res.json({ success: true, user: req.user, token });
    } else {
        res.status(401).json({ success: false, message: 'Échec de l’authentification' });
    }
});

router.get('/login/facebook', passport.authenticate('facebook')
    , (req, res) => {
        if (req.user) {
            let token = userService.createJWT(req, res)
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development', // use secure in production
                sameSite: 'strict',
            });
            res.json({ success: true, user: req.user, token });
        } else {
            res.status(401).json({ success: false, message: 'Échec de l’authentification' });
        }
    }
);

router.get('/login/facebook/callback', passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/main',
    failureRedirect: '/'
}));

router.get('/protected', passport.authenticate('jwt'), (req, res) => {
    res.status(200).json({ success: true, message: 'vous possédez un token jwt' });
});


module.exports = router;