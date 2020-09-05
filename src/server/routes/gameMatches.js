const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router.route("/GameMatches").get(async (req, res) => {
        const { GameId, DivisionId } = req.query;

        const matches = await db.Match.findAll({
            where: { GameId, DivisionId },
        });
        if (!matches) return res.json([]);
        const matchList = [];
        for (let i = 0; i < matches.length; i++) {
            matchList.push({
                ...matches[i].dataValues,
                teams: await matches[i].getTeams(),
            });
        }
        res.json(matchList);
    });
};
