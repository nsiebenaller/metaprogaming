const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router.route("/PlayerRoles").post(tokenChecker, async (req, res) => {
        const { PlayerId, RoleIds } = req.body;
        if (!PlayerId || !RoleIds) return res.json({ success: false });

        const player = await db.Player.findOne({ where: { id: PlayerId } });
        if (!player) res.json({ success: false });
        player.setRoles([]);

        const requests = [];
        RoleIds.forEach((id) => {
            requests.push(db.Role.findOne({ where: { id } }));
        });
        const roles = await Promise.all(requests);
        player.setRoles(roles);

        res.json({ success: true });
    });
};
