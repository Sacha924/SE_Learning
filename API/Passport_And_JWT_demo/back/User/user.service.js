const userModel = require("./user.model");
const bcrypt = require("bcrypt");

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
        console.log("successfully registered")
    }
    catch (err) {
        console.log("error:", err)
    }
}

const loginUser = async (req, res) => {

}


module.exports = {
    registerUser,
    loginUser,
};