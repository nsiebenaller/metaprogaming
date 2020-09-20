const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router
        .route("/OrganizationMatches")
        .post(tokenChecker, async (req, res) => {
            /** DEPRECATED! */
            const {
                AwayOrganizationId,
                HomeOrganizationId,
                MatchId,
            } = req.body;
            await db.Match.update(
                { AwayOrganizationId, HomeOrganizationId },
                { where: { id: MatchId } }
            );
            res.json({ success: true });
        })
        .delete(tokenChecker, async (req, res) => {
            const { MatchId } = req.query;
            if (!MatchId) return res.json({ success: false });
            await db.Match.update(
                { AwayOrganizationId: null, HomeOrganizationId: null },
                { where: { id: MatchId } }
            );
            res.json({ success: true });
        });
};
