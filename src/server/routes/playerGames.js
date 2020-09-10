const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router.route("/PlayerGames").post(tokenChecker, async (req, res) => {
        const { PlayerId, GameIds } = req.body;
        if (!PlayerId || !GameIds) return res.json({ success: false });

        const player = await db.Player.findOne({ where: { id: PlayerId } });
        if (!player) res.json({ success: false });
        player.setGames([]);

        const requests = [];
        GameIds.forEach((GameId) => {
            requests.push(db.Game.findOne({ where: { id: GameId } }));
        });
        const games = await Promise.all(requests);
        player.setGames(games);

        res.json({ success: true });
    });
};
