const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router.route("/GameMatches").get(async (req, res) => {
        const { GameId, DivisionId } = req.query;

        const matchList = await db.Match.findAll({
            where: { GameId, DivisionId },
            include: [
                {
                    model: db.Team,
                    as: "firstTeam",
                },
                {
                    model: db.Team,
                    as: "secondTeam",
                },
            ],
        });
        res.json(matchList);
    });
};
