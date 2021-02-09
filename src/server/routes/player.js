const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router
        .route("/Player")
        .get(async (req, res) => {
            const players = await req.db.Player.findAll();
            res.json(players);
        })
        .post(tokenChecker, async (req, res) => {
            const result = await req.db.Player.create(req.body);
            res.json({ success: true, id: result.id });
        })
        .patch(tokenChecker, async (req, res) => {
            const request = req.body;
            const { id, ...props } = request;

            // Find Player
            const player = await req.db.Player.findOne({
                where: { id: id },
            });
            if (!player) {
                return res.json({
                    succes: false,
                    messages: ["Cannot find player with id"],
                });
            }

            // Update Player Fields
            await req.db.Player.update(props, { where: { id } });

            // Update Player Join Fields
            await syncPlayerGames(player, request, req.db);
            await syncPlayerRoles(player, request, req.db);

            res.json({ success: true, messages: [] });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            await req.db.Player.destroy({ where: { id } });
            res.json({ success: true });
        });
};

async function syncPlayerGames(player, request, db) {
    if (!request || request.games === undefined || request.games === null) {
        return;
    }
    if (request.games.length === 0) {
        player.setGames([]);
        return;
    }
    const gameIds = request.games.map((x) => x.id);
    const games = await db.Game.findAll({ where: { id: gameIds } });
    player.setGames(games);
}
async function syncPlayerRoles(player, request, db) {
    if (!request || request.roles === undefined || request.roles === null) {
        return;
    }
    if (request.roles.length === 0) {
        player.setRoles([]);
        return;
    }
    const roleIds = request.roles.map((x) => x.id);
    const roles = await db.Role.findAll({ where: { id: roleIds } });
    player.setRoles(roles);
}
