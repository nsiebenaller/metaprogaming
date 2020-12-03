const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { tokenChecker } = require("../tokenChecker");

const secret = process.env.SECRET || "secret"; // set secret for jwt

const PlayerAndJoins = {
    model: db.Player,
    as: "players",
    through: { attributes: [] },
    include: [
        {
            model: db.Game,
            as: "games",
            through: { attributes: [] },
        },
        {
            model: db.Role,
            as: "roles",
            through: { attributes: [] },
        },
        {
            model: db.Organization,
            as: "organizations",
            through: { attributes: [] },
        },
    ],
};

module.exports = (router) => {
    router.route("/login").post(async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) return res.send({ success: false });

        const user = await db.User.findOne({
            where: { username },
            include: [PlayerAndJoins],
        });
        if (!user) return res.send({ success: false });
        const success = await compare(password, user.password);
        if (!success) return res.send({ success: false });

        const token = getToken(user);
        res.cookie("meta_token", token);
        res.send({ success: true });
    });
    router.route("/logout").get(async (req, res) => {
        const token = revokeToken();
        res.cookie("meta_token", token);
        res.send({ success: true });
    });
    router.route("/check").get(async (req, res) => {
        const token = verifyToken(req);
        if (!token.verified || !token.user) {
            return res.json({ ...token });
        }
        const { id } = token.user;
        const user = await db.User.findOne({
            where: { id },
            include: [PlayerAndJoins],
        });
        if (!user) {
            return res.json({ verified: false });
        }
        res.send({
            ...token,
            user: {
                ...user.dataValues,
                password: "",
            },
        });
    });
};

function getToken(user) {
    const payload = {
        user: {
            ...user.dataValues,
            password: "",
        },
    };
    return jwt.sign(payload, secret, { expiresIn: "1d" });
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
    let verifiedToken;
    try {
        verifiedToken = jwt.verify(token, secret);
    } catch (e) {
        return { verified: false };
    }
    if (!verifiedToken) return { verified: false };
    const { exp, revoked } = verifiedToken;
    if (!exp) return { verified: false };

    // Check revoked
    if (revoked) return { verified: false };

    // Check expired
    const now = new Date().getTime();
    const expire = parseInt(exp * 1000);
    if (expire < now) return { verified: false };
    return { verified: true, ...verifiedToken };
}

function compare(text, hash) {
    return new Promise((resolve) => {
        bcrypt.compare(text, hash, function (err, result) {
            resolve(result);
        });
    });
}
