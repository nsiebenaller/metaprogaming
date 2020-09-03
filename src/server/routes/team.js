const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router
        .route("/Team")
        .get(async (req, res) => {
            const teams = await db.Team.findAll({
                include: [
                    {
                        model: db.Player,
                        as: "players",
                        through: { attributes: [] },
                    },
                ],
            });
            res.json(teams);
        })
        .post(tokenChecker, async (req, res) => {
            const result = await db.Team.create(req.body);
            res.json({ success: true });
        });
};
