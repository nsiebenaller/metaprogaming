const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router
        .route("/Match")
        .get(async (req, res) => {
            const { id } = req.query;

            let matches = [];
            if (!id) {
                matches = await db.Match.findAll();
            } else {
                matches = await db.Match.findAll({
                    where: { id },
                    include: [
                        {
                            model: db.Team,
                            as: "teams",
                            through: { attributes: [] },
                        },
                    ],
                });
            }

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
            const match = await db.Match.findOne({
                where: { id: req.query.id },
            });
            if (!match) return res.json({ success: false });
            match.setTeams([]);
            await db.Match.destroy({ where: { id: req.query.id } });
            res.json({ success: true });
        });
};
