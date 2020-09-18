const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router
        .route("/Organization")
        .get(async (req, res) => {
            const { id } = req.query;
            let orgs = [];

            if (!id) {
                orgs = await db.Organization.findAll({
                    include: [
                        {
                            model: db.Player,
                            as: "players",
                            through: { attributes: [] },
                            include: [
                                {
                                    model: db.Game,
                                    as: "games",
                                    through: { attributes: [] },
                                },
                                {
                                    model: db.Role,
                                    as: "roles",
                                    through: { attributes: [] },
                                },
                            ],
                        },
                    ],
                });
            } else {
                orgs = await db.Organization.findAll({
                    where: { id },
                    include: [
                        {
                            model: db.Player,
                            as: "players",
                            through: { attributes: [] },
                            include: [
                                {
                                    model: db.Game,
                                    as: "games",
                                    through: { attributes: [] },
                                },
                                {
                                    model: db.Role,
                                    as: "roles",
                                    through: { attributes: [] },
                                },
                            ],
                        },
                    ],
                });
            }

            res.json(orgs);
        })
        .post(tokenChecker, async (req, res) => {
            await db.Organization.create(req.body);
            res.json({ success: true });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, ...props } = req.body;
            await db.Organization.update(props, { where: { id } });
            res.json({ success: true, id });
        });
};
