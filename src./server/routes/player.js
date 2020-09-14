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
            res.json({ success: true, id: result.id });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, ...props } = req.body;
            await db.Player.update(props, { where: { id } });
            res.json({ success: true, id });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            await db.Player.destroy({ where: { id } });
            res.json({ success: true });
        });
};
