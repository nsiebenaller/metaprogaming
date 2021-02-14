const { tokenChecker } = require("../tokenChecker");

const withOrgsAndTeams = (db) => [
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

async function getMatchesWhere(db, where) {
    return await db.Match.findAll({
        where,
        include: withOrgsAndTeams(db),
    });
}

async function getMatchesForSeason(db, seasonId) {
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
        include: MatchJoins(db),
    });
    return seasonMatches;
}

module.exports = (router) => {
    router
        .route("/Match")
        .get(async ({ db, query }, res) => {
            const { id, SeasonId, GameId, GameTypeId } = query;

            if (id) {
                const matches = await getMatchesWhere(db, { id });
                return res.json(matches);
            }

            if (SeasonId) {
                const matches = await getMatchesForSeason(db, SeasonId);
                return res.json(matches);
            }

            if (GameId) {
                const where = { GameId };
                if (GameTypeId) where.GameTypeId = GameTypeId;
                const matches = await getMatchesWhere(db, where);
                return res.json(matches);
            }

            const matches = await getMatchesWhere(db, {});
            res.json(matches);
        })
        .post(tokenChecker, async ({ db, body }, res) => {
            const result = await db.Match.create(body);
            res.json({ success: true, id: result.id });
        })
        .patch(tokenChecker, async ({ db, body }, res) => {
            const { id, ...props } = body;
            await db.Match.update(props, { where: { id } });
            res.json({ success: true, id });
        })
        .delete(tokenChecker, async ({ db, query }, res) => {
            await db.Match.destroy({ where: { id: query.id } });
            res.json({ success: true });
        });
};
