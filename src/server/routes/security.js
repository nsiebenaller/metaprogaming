const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { tokenChecker } = require("../tokenChecker");

const secret = process.env.SECRET || "secret"; // set secret for jwt

module.exports = (router) => {
    router.route("/login").post(async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) return res.send({ success: false });

        const user = await db.User.findOne({ where: { username } });
        if (!user) return res.send({ success: false });
        const success = await compare(password, user.password);
        if (!success) return res.send({ success: false });

        const token = getToken(username);
        res.cookie("meta_token", token);
        res.send({ success: true });
    });
    router.route("/logout").get(async (req, res) => {
        const token = revokeToken();
        res.cookie("meta_token", token);
        res.send({ success: true });
    });
    router.route("/check").get(tokenChecker, async (req, res) => {
        res.send({ verified: true });
    });
};

function getToken(username) {
    return jwt.sign(
        {
            username,
        },
        secret,
        { expiresIn: "1d" }
    );
}

function revokeToken() {
    return jwt.sign(
        {
            revoked: true,
        },
        secret,
        { expiresIn: "1d" }
    );
}

function compare(text, hash) {
    return new Promise((resolve) => {
        bcrypt.compare(text, hash, function (err, result) {
            resolve(result);
        });
    });
}
