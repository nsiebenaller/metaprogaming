const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router
        .route("/Match")
        .get(async (req, res) => {
            const { id } = req.query;

            const whereClause = id ? { where: { id } } : {};

            const matches = await db.Match.findAll({
                ...whereClause,
                include: [
                    {
                        model: db.Organization,
                        as: "awayOrg",
                        include: [
                            {
                                model: db.Team,
                                as: "teams",
                            },
                        ],
                    },
                    {
                        model: db.Organization,
                        as: "homeOrg",
                        include: [
                            {
                                model: db.Team,
                                as: "teams",
                            },
                        ],
                    },
                    {
                        model: db.Team,
                        as: "awayTeam",
                    },
                    {
                        model: db.Team,
                        as: "homeTeam",
                    },
                ],
            });

            res.json(matches);
        })
        .post(tokenChecker, async (req, res) => {
            const result = await db.Match.create(req.body);
            res.json({ success: true, id: result.id });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, ...matchProps } = req.body;
            await db.Match.update(matchProps, { where: { id } });
            res.json({ success: true, id });
        })
        .delete(tokenChecker, async (req, res) => {
            await db.Match.destroy({ where: { id: req.query.id } });
            res.json({ success: true });
        });
};
