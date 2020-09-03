const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router
        .route("/Match")
        .get(async (req, res) => {
            const matches = await db.Match.findAll();
            res.json(matches);
        })
        .post(tokenChecker, async (req, res) => {
            const result = await db.Match.create(req.body);
            res.json({ success: true });
        })
        .delete(tokenChecker, async (req, res) => {
            const match = await db.Match.findOne({
                where: { id: req.body.id },
            });
            if (!match) return res.json({ success: false });
            match.setTeams([]);
            await db.Match.destroy({ where: { id: req.body.id } });
            res.json({ success: true });
        });
};
