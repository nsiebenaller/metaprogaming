const db = require("../models");
const { tokenChecker } = require("../tokenChecker");
const { uploadFile } = require("../managers/fileManager");

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
                        {
                            model: db.Team,
                            as: "teams",
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
                        {
                            model: db.Team,
                            as: "teams",
                        },
                    ],
                });
            }

            res.json(orgs);
        })
        .post(tokenChecker, async (req, res) => {
            const { name } = req.body;
            const { image } = req.files;

            // Upload files to S3
            const requests = [];
            if (image) requests.push(uploadFile(image));
            await Promise.all(requests);

            const org = {};
            if (name) org.name = name;
            if (image) org.image = image.name;

            await db.Organization.create(org);
            res.json({ success: true });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, name } = req.body;
            const { image } = req.files;

            if (!id) {
                return res.json({ success: false });
            }

            // Upload files to S3
            const requests = [];
            if (image) requests.push(uploadFile(image));
            await Promise.all(requests);

            const org = {};
            if (name) org.name = name;
            if (image) org.image = image.name;

            await db.Organization.update(org, { where: { id } });
            res.json({ success: true, id });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            await db.Organization.destroy({ where: { id } });
            res.json({ success: true });
        });
};
