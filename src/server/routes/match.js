const { tokenChecker } = require("../tokenChecker");

const MatchJoins = (db) => [
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
            const { id, SeasonId, GameId, GameTypeId } = req.query;

            if (id) {
                return res.json(
                    await req.db.Match.findAll({
                        where: { id },
                        include: MatchJoins(db),
                    })
                );
            }

            if (SeasonId) {
                return res.json(await getMatchesForSeason(SeasonId));
            }

            if (GameId) {
                const where = { where: { GameId } };
                if (GameTypeId) where.where.GameTypeId = GameTypeId;

                return res.json(
                    await req.db.Match.findAll({
                        ...where,
                        include: MatchJoins,
                    })
                );
            }

            res.json(
                await req.db.Match.findAll({
                    include: MatchJoins,
                })
            );
        })
        .post(tokenChecker, async (req, res) => {
            const result = await req.db.Match.create(req.body);
            res.json({ success: true, id: result.id });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, ...props } = req.body;
            await req.db.Match.update(props, { where: { id } });
            res.json({ success: true, id });
        })
        .delete(tokenChecker, async (req, res) => {
            await req.db.Match.destroy({ where: { id: req.query.id } });
            res.json({ success: true });
        });
};

async function getMatchesForSeason(seasonId) {
    // Find Season
    const season = await req.db.Season.findOne({
        where: { id: seasonId },
        include: [{ model: req.db.Week, as: "weeks" }],
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
    const seasonMatches = await req.db.Match.findAll({
        where: {
            date: { [Op.between]: [seasonStart, seasonEnd] },
            GameTypeId: season.GameTypeId,
            GameId: season.GameId,
        },
        include: MatchJoins,
    });
    return seasonMatches;
}
