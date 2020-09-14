const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router.route("/Game").get(async (req, res) => {
        const games = await db.Game.findAll();
        res.json(games);
    });
};
