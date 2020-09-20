const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router
        .route("/Team")
        .post(tokenChecker, async (req, res) => {
            const result = await db.Team.create(req.body);
            res.json({ success: true, id: result.id });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, ...props } = req.body;
            await db.Team.update(props, { where: { id } });
            res.json({ success: true, id });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            await db.Team.destroy({ where: { id } });
            res.json({ success: true });
        });
};
