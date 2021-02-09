const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router
        .route("/OrganizationPlayers")
        .post(tokenChecker, async (req, res) => {
            const org = await req.db.Organization.findOne({
                where: { id: req.body.OrganizationId },
            });
            if (!org) return res.json({ success: false });
            const player = await req.db.Player.findOne({
                where: { id: req.body.PlayerId },
            });
            if (!player) return res.json({ success: false });
            await player.addOrganizations(org);
            res.json({ success: true });
        })
        .delete(tokenChecker, async (req, res) => {
            const { PlayerId, OrganizationId } = req.query;
            const org = await req.db.Organization.findOne({
                where: { id: OrganizationId },
                include: [
                    {
                        model: req.db.Player,
                        as: "players",
                        through: { attributes: [] },
                    },
                ],
            });
            if (!org) return res.json({ success: false });
            const player = await req.db.Player.findOne({
                where: { id: PlayerId },
                include: [
                    {
                        model: req.db.Organization,
                        as: "organizations",
                        through: { attributes: [] },
                    },
                ],
            });
            if (!player) return res.json({ success: false });

            const orgs = player.organizations.filter((x) => x.id !== org.id);
            await player.setOrganizations(orgs);

            const players = org.players.filter((x) => x.id !== player.id);
            await org.setPlayers(players);

            res.json({ success: true });
        });
};
