const db = require("../models");
const { tokenChecker } = require("../tokenChecker");
const { Op } = require("sequelize");

module.exports = (router) => {
    router
        .route("/Season")
        .get(async (req, res) => {
            const { GameId, GameTypeId, active } = req.query;

            const whereClause = { where: {} };
            if (GameId) whereClause.where.GameId = GameId;
            if (GameTypeId) whereClause.where.GameTypeId = GameTypeId;
            if (active) whereClause.where.active = true;

            const seasons = await db.Season.findAll({
                ...whereClause,
                include: [
                    {
                        model: db.Week,
                        as: "weeks",
                    },
                ],
            });

            res.json(seasons);
        })
        .post(tokenChecker, async (req, res) => {
            const { body } = req;

            const { id } = await db.Season.create(body);

            let start = new Date(body.startDate);
            let end = nextWeek(start);
            for (let i = 0; i < body.numWeeks; i++) {
                const name = `Week ${i + 1}`;
                await db.Week.create({ name, start, end, SeasonId: id });
                start = end;
                end = nextWeek(start);
            }

            res.json({ success: true });
        })
        .patch(tokenChecker, async (req, res) => {
            const { body } = req;

            const { GameId, GameTypeId } = await db.Season.findOne({
                where: { id: body.id },
            });
            await db.Season.update(
                { active: false },
                { where: { GameId: GameId, GameTypeId: GameTypeId || null } }
            );
            await db.Season.update(
                { active: true },
                { where: { id: body.id } }
            );

            res.json({ success: true });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            await db.Season.destroy({ where: { id } });
            res.json({ success: true });
        });
    router.route("/Leaderboard").get(async (req, res) => {
        const { SeasonId } = req.query;
        if (!SeasonId) {
            return res.json({
                success: false,
                message: "SeasonId is a required field",
            });
        }
        const season = await db.Season.findOne({
            where: { id: SeasonId },
            include: [{ model: db.Week, as: "weeks" }],
        });
        if (!season) {
            return res.json({
                success: false,
                message: `No season found for given id: ${SeasonId}`,
            });
        }

        // Find earliest week
        let seasonStart = null;
        let seasonEnd = null;
        season.weeks.forEach((week) => {
            const weekStart = new Date(week.start).getTime();
            const weekEnd = new Date(week.end).getTime();
            if (seasonStart === null || seasonStart > weekStart) {
                seasonStart = weekStart;
            }
            if (seasonEnd === null || seasonEnd < weekEnd) {
                seasonEnd = weekEnd;
            }
        });
        if (!seasonStart) {
            return res.json({
                success: false,
                message: `No season start date for given id: ${SeasonId}`,
            });
        }

        // Seed Leaderboard teams
        let leaderboard = {};
        const allMatches = await db.Match.findAll({
            where: {
                [Op.or]: [
                    {
                        date: { [Op.between]: [seasonStart, seasonEnd] },
                    },
                    {
                        date: seasonStart,
                    },
                    {
                        date: seasonEnd,
                    },
                ],
                GameTypeId: season.GameTypeId,
                GameId: season.GameId,
            },
            include: [
                {
                    model: db.Organization,
                    as: "awayOrg",
                },
                {
                    model: db.Organization,
                    as: "homeOrg",
                },
                {
                    model: db.Team,
                    as: "awayTeam",
                },
                {
                    model: db.Team,
                    as: "homeTeam",
                },
            ],
        });

        allMatches.forEach((match) => {
            const awayScore = match.firstTeamScore || 0;
            const homeScore = match.secondTeamScore || 0;
            const awayWin = awayScore > homeScore;
            const homeWin = homeScore > awayScore;
            const tie = homeScore === awayScore;
            const awayTeam = {
                TeamId: match.AwayTeamId,
                OrgId: match.AwayOrganizationId,
                teamName: match.awayTeam ? match.awayTeam.name : "",
                orgName: match.awayOrg ? match.awayOrg.name : "",
            };
            const homeTeam = {
                TeamId: match.HomeTeamId,
                OrgId: match.HomeOrganizationId,
                teamName: match.homeTeam ? match.homeTeam.name : "",
                orgName: match.homeOrg ? match.homeOrg.name : "",
            };

            if (awayWin) {
                leaderboard = addWin(leaderboard, awayTeam);
                leaderboard = addLoss(leaderboard, homeTeam);
            } else if (homeWin) {
                leaderboard = addLoss(leaderboard, awayTeam);
                leaderboard = addWin(leaderboard, homeTeam);
            } else if (tie) {
                leaderboard = addTie(leaderboard, awayTeam);
                leaderboard = addTie(leaderboard, homeTeam);
            }
        });

        const values = Object.values(leaderboard).filter((x) => {
            if (x.TeamId === null && x.OrgId === null) {
                return false;
            }
            return true;
        });
        res.json(values);
    });
};

function nextWeek(date) {
    var nextweek = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 7
    );
    return nextweek;
}

function addWin(leaderboard, team) {
    const id = `${team.OrgId}-${team.TeamId}`;
    const row = leaderboard[id] || { ...team, win: 0, loss: 0, tie: 0 };
    leaderboard[id] = { ...row, win: row.win + 1 };
    return leaderboard;
}

function addLoss(leaderboard, team) {
    const id = `${team.OrgId}-${team.TeamId}`;
    const row = leaderboard[id] || { ...team, win: 0, loss: 0, tie: 0 };
    leaderboard[id] = { ...row, loss: row.loss + 1 };
    return leaderboard;
}

function addTie(leaderboard, team) {
    const id = `${team.OrgId}-${team.TeamId}`;
    const row = leaderboard[id] || { ...team, win: 0, loss: 0, tie: 0 };
    leaderboard[id] = { ...row, tie: row.tie + 1 };
    return leaderboard;
}

function addTeam(leaderboard, team) {
    const id = `${team.OrgId}-${team.TeamId}`;
    const row = leaderboard[id];
    if (!row) leaderboard[id] = { ...team, win: 0, loss: 0, tie: 0 };
    return leaderboard;
}
