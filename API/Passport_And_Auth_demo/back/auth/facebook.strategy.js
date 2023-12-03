var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
const userModel = require("./../User/user.model");

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:4000/user/login/facebook/callback',
    profileFields: ['id', 'displayName', 'name', 'email']
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            let user = await userModel.findOne({ facebookId: profile.id });

            if (!user) {
                // User not found, create a new user
                user = new userModel({
                    facebookId: profile.id,
                    username: profile.displayName,
                });

                await user.save();
            }

            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    }
));

