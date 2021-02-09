const { tokenChecker } = require("../tokenChecker");
const { uploadFile, removeFile, getExt } = require("../managers/fileManager");

module.exports = (router) => {
    router
        .route("/Organization")
        .get(async (req, res) => {
            const { id } = req.query;
            let orgs = [];

            if (!id) {
                orgs = await req.db.Organization.findAll({
                    include: [
                        {
                            model: req.db.Player,
                            as: "players",
                            through: { attributes: [] },
                            include: [
                                {
                                    model: req.db.Game,
                                    as: "games",
                                    through: { attributes: [] },
                                },
                                {
                                    model: req.db.Role,
                                    as: "roles",
                                    through: { attributes: [] },
                                },
                            ],
                        },
                        {
                            model: req.db.Team,
                            as: "teams",
                        },
                    ],
                });
            } else {
                orgs = await req.db.Organization.findAll({
                    where: { id },
                    include: [
                        {
                            model: req.db.Player,
                            as: "players",
                            through: { attributes: [] },
                            include: [
                                {
                                    model: req.db.Game,
                                    as: "games",
                                    through: { attributes: [] },
                                },
                                {
                                    model: req.db.Role,
                                    as: "roles",
                                    through: { attributes: [] },
                                },
                            ],
                        },
                        {
                            model: req.db.Team,
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

            if (!name) {
                return res.json({
                    success: false,
                    messages: ["name is a required field!"],
                });
            }
            const org = await req.db.Organization.create({ name });

            // Upload files to S3
            if (image) {
                const ext = getExt(image.name);
                if (!ext) {
                    return res.json({
                        success: false,
                        messages: [
                            "unable to retrieve extension from image, organization has been created",
                        ],
                    });
                }

                image.name = `organization/img-${org.id}.${ext}`;
                const resp = await uploadFile(image);
                if (!resp.success) {
                    return res.json({
                        success: false,
                        messages: [],
                    });
                }
                const img = resp.key;
                await req.db.Organization.update(
                    { image: img },
                    { where: { id: org.id } }
                );
            }

            res.json({ success: true });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, name } = req.body;
            const { image } = req.files;

            if (!id) {
                return res.json({ success: false, messages: [] });
            }

            const organization = await req.db.Organization.findOne({
                where: { id },
            });
            if (!organization) {
                return res.json({
                    success: false,
                    messages: ["unable to find organization"],
                });
            }

            let img = "";
            if (image) {
                const ext = getExt(image.name);
                if (!ext) {
                    return res.json({
                        success: false,
                        messages: ["unable to retrieve extension from image"],
                    });
                }

                if (organization.image) {
                    await removeFile(organization.image);
                }

                image.name = `organization/img-${organization.id}.${ext}`;
                const resp = await uploadFile(image);
                if (!resp.success) {
                    return res.json({
                        success: false,
                        messages: ["unable to update to S3"],
                    });
                }
                img = resp.key;
            }
            await req.db.Organization.update(
                { name, image: img },
                { where: { id } }
            );
            res.json({ success: true, id });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            await req.db.Organization.destroy({ where: { id } });
            res.json({ success: true });
        });
};
