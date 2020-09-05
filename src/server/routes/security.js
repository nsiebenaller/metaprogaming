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
    router.route("/check").get(async (req, res) => {
        res.send({ ...verifyToken(req) });
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

function verifyToken(req) {
    const token = req.cookies.meta_token;
    if (!token) return { verified: false };
    const verifiedToken = jwt.verify(token, secret);
    if (!verifiedToken) return { verified: false };
    const { exp, revoked } = verifiedToken;
    if (!exp) return { verified: false };

    // Check revoked
    if (revoked) return { verified: false };

    // Check expired
    const now = new Date().getTime();
    const expire = parseInt(exp * 1000);
    if (expire < now) return { verified: false };
    return { verified: true, username: verifiedToken.username };
}

function compare(text, hash) {
    return new Promise((resolve) => {
        bcrypt.compare(text, hash, function (err, result) {
            resolve(result);
        });
    });
}
