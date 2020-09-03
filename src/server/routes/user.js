const db = require("../models");
const bcrypt = require("bcrypt");
const { tokenChecker } = require("../tokenChecker");

const saltRounds = 10;

module.exports = (router) => {
    router.route("/User").post(tokenChecker, async (req, res) => {
        const { username, password } = req.body;

        const results = await db.User.findAll({ where: { username } });
        if (results.length > 0) return res.json({ success: false });

        const encryptedPassword = await encrypt(password);
        await db.User.create({
            username,
            password: encryptedPassword,
        });

        res.json({ success: true });
    });
};

function encrypt(text) {
    return new Promise((resolve) => {
        bcrypt.hash(text, saltRounds, function (err, hash) {
            resolve(hash);
        });
    });
}
