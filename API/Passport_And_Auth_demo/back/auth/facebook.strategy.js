var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
const userModel = require("./../User/user.model");

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:4000/user/login/facebook/callback'

},
    async function (accessToken, refreshToken, profile, cb) {
        // try {
        //     const user = await findOrCreateUser(profile);
        //     cb(null, user);
        // } catch (err) {
        //     cb(err);
        // }
        return cb(null, profile)
    }
));

async function findOrCreateUser(profile) {
    try {
        const user = await userModel.findOneAndUpdate(
            { facebookId: profile.id },
            { $setOnInsert: { facebookId: profile.id } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        return user;
    } catch (err) {
        // Gérer l'erreur
        console.error(err);
        throw err;
    }
}