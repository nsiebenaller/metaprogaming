const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router
        .route("/Player")
        .get(async (req, res) => {
            const players = await db.Player.findAll();
            res.json(players);
        })
        .post(tokenChecker, async (req, res) => {
            const result = await db.Player.create(req.body);
            res.json({ success: true });
        });
};
