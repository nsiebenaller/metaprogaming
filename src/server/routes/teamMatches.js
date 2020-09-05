const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router
        .route("/TeamMatches")
        .post(tokenChecker, async (req, res) => {
            const team = await db.Team.findOne({
                where: { id: req.body.TeamId },
            });
            if (!team) return res.json({ success: false });
            const match = await db.Match.findOne({
                where: { id: req.body.MatchId },
            });
            if (!match) return res.json({ success: false });
            await match.addTeams(team);
            res.json({ success: true });
        })
        .delete(tokenChecker, async (req, res) => {
            const { MatchId } = req.query;
            if (!MatchId) return res.json({ success: false });
            const match = await db.Match.findOne({
                where: { id: MatchId },
            });
            if (!match) return res.json({ success: false });
            await match.setTeams([]);
            res.json({ success: true });
        });
};
