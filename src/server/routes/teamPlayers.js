const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router
        .route("/TeamPlayers")
        .post(tokenChecker, async (req, res) => {
            const team = await db.Team.findOne({
                where: { id: req.body.TeamId },
            });
            if (!team) return res.json({ success: false });
            const player = await db.Player.findOne({
                where: { id: req.body.PlayerId },
            });
            if (!player) return res.json({ success: false });
            await player.addTeams(team);
            res.json({ success: true });
        })
        .delete(tokenChecker, async (req, res) => {
            const { PlayerId, TeamId } = req.query;
            const team = await db.Team.findOne({
                where: { id: TeamId },
                include: [
                    {
                        model: db.Player,
                        as: "players",
                        through: { attributes: [] },
                    },
                ],
            });
            if (!team) return res.json({ success: false });
            const player = await db.Player.findOne({
                where: { id: PlayerId },
                include: [
                    {
                        model: db.Team,
                        as: "teams",
                        through: { attributes: [] },
                    },
                ],
            });
            if (!player) return res.json({ success: false });

            const teams = player.teams.filter((x) => x.id !== team.id);
            await player.setTeams(teams);

            const players = team.players.filter((x) => x.id !== player.id);
            await team.setPlayers(players);

            res.json({ success: true });
        });
};
