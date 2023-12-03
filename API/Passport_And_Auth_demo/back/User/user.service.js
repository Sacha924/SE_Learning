const userModel = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        let user = {
            username: req.body.username,
            password: hash,
        };
        userModel
            .create(user)
            .then((result) => res.status(200).json({ result }))
            .catch((error) => res.status(500).json({ msg: error }));
    }
    catch (err) {
        console.log("error:", err)
    }
}


async function checkPassword(username, password) {
    const user = await userModel.findOne({ username });
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return false;
    }
    return user;
}

function createJWT(req, res) {
    try {
        const payload = {
            sub: req.user._id,
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET);
        return token 
    }
    catch (err) {
        res.status(401).json({ success: false, message: 'Échec de la création du JWT' });
    }
}

module.exports = {
    registerUser,
    checkPassword,
    createJWT
};