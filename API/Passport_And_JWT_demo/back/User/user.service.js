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
    }
    catch (err) {
        console.log("error:", err)
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body
    const validUser = checkPassword(username, password)
    if (!validUser) {
        res.status(401).json({ msg: "Invalid username or password" });
    }
    else {
        res.status(200).json({ msg: "Login successful" });
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

module.exports = {
    registerUser,
    loginUser,
};