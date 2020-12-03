const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

const MatchJoins = [
    {
        model: db.Organization,
        as: "awayOrg",
        include: [
            {
                model: db.Team,
                as: "teams",
            },
        ],
    },
    {
        model: db.Organization,
        as: "homeOrg",
        include: [
            {
                model: db.Team,
                as: "teams",
            },
        ],
    },
    {
        model: db.Team,
        as: "awayTeam",
    },
    {
        model: db.Team,
        as: "homeTeam",
    },
];

module.exports = (router) => {
    router
        .route("/Match")
        .get(async (req, res) => {
            const { id, seasonId } = req.query;

            if (seasonId) {
                return res.json(await getMatchesForSeason(seasonId));
            }

            const whereClause = id ? { where: { id } } : {};

            const matches = await db.Match.findAll({
                ...whereClause,
                include: MatchJoins,
            });

            res.json(matches);
        })
        .post(tokenChecker, async (req, res) => {
            const result = await db.Match.create(req.body);
            res.json({ success: true, id: result.id });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, ...props } = req.body;
            await db.Match.update(props, { where: { id } });
            res.json({ success: true, id });
        })
        .delete(tokenChecker, async (req, res) => {
            await db.Match.destroy({ where: { id: req.query.id } });
            res.json({ success: true });
        });
};

async function getMatchesForSeason(seasonId) {
    // Find Season
    const season = await db.Season.findOne({
        where: { id: seasonId },
        include: [{ model: db.Week, as: "weeks" }],
    });
    if (!season) {
        return [];
    }

    // Find Season Start & End
    let seasonStart = null;
    let seasonEnd = null;
    season.weeks.forEach((week) => {
        const weekStart = new Date(week.start).getTime();
        if (seasonStart === null || seasonStart > weekStart) {
            seasonStart = weekStart;
        }
        if (seasonEnd === null || seasonEnd < weekStart) {
            seasonEnd = weekStart;
        }
    });
    if (!seasonStart || !seasonEnd) {
        return [];
    }

    // Find Relevant Matches
    const seasonMatches = await db.Match.findAll({
        where: {
            date: { [Op.between]: [seasonStart, seasonEnd] },
            GameTypeId: season.GameTypeId,
            GameId: season.GameId,
        },
        include: MatchJoins,
    });
    return seasonMatches;
}
