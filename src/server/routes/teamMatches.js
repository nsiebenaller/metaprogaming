const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router
        .route("/TeamMatches")
        .post(tokenChecker, async (req, res) => {
            const { FirstTeamId, SecondTeamId, MatchId } = req.body;
            await db.Match.update(
                { FirstTeamId, SecondTeamId },
                { where: { id: MatchId } }
            );
            res.json({ success: true });
        })
        .delete(tokenChecker, async (req, res) => {
            const { MatchId } = req.query;
            if (!MatchId) return res.json({ success: false });
            await db.Match.update(
                { FirstTeamId: null, SecondTeamId: null },
                { where: { id: MatchId } }
            );
            res.json({ success: true });
        });
};
