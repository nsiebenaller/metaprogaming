const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router.route("/GameMatches").get(async (req, res) => {
        const { GameId, DivisionId } = req.query;

        const matchList = await db.Match.findAll({
            where: { GameId, DivisionId },
            include: [
                {
                    model: db.Organization,
                    as: "awayOrg",
                },
                {
                    model: db.Organization,
                    as: "homeOrg",
                },
            ],
        });
        res.json(matchList);
    });
};
