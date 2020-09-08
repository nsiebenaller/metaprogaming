const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router
        .route("/Week")
        .get(async (req, res) => {
            const { GameId, DivisionId } = req.query;
            const whereClause =
                GameId && DivisionId ? { where: { GameId, DivisionId } } : {};
            const data = await db.Week.findAll({ ...whereClause });
            res.json(data);
        })
        .post(tokenChecker, async (req, res) => {
            await db.Week.create(req.body);
            res.json({ success: true });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, ...props } = req.body;
            await db.Week.update(props, { where: { id } });
            res.json({ success: true, id });
        })
        .delete(tokenChecker, async (req, res) => {
            const { GameId, DivisionId } = req.query;
            if (!GameId || !DivisionId) return res.json({ success: false });
            await db.Week.destroy({ where: { GameId, DivisionId } });
            res.json({ success: true });
        });
};
