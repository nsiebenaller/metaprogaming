const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router
        .route("/Team")
        .get(async (req, res) => {
            const { id } = req.query;
            let teams = [];

            if (!id) {
                teams = await db.Team.findAll({
                    include: [
                        {
                            model: db.Player,
                            as: "players",
                            through: { attributes: [] },
                            include: [
                                {
                                    model: db.Game,
                                    as: "games",
                                    through: { attributes: [] },
                                },
                            ],
                        },
                    ],
                });
            } else {
                teams = await db.Team.findAll({
                    where: { id },
                    include: [
                        {
                            model: db.Player,
                            as: "players",
                            through: { attributes: [] },
                            include: [
                                {
                                    model: db.Game,
                                    as: "games",
                                    through: { attributes: [] },
                                },
                            ],
                        },
                    ],
                });
            }

            res.json(teams);
        })
        .post(tokenChecker, async (req, res) => {
            await db.Team.create(req.body);
            res.json({ success: true });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, ...teamProps } = req.body;
            await db.Team.update(teamProps, { where: { id } });
            res.json({ success: true, id });
        });
};
