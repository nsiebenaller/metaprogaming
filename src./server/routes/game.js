const db = require("../models");
const { tokenChecker } = require("../tokenChecker");
const { uploadFile } = require("../index");

module.exports = (router) => {
    router
        .route("/Game")
        .get(async (req, res) => {
            const games = await db.Game.findAll({
                include: [
                    {
                        model: db.GameType,
                        as: "gameTypes",
                    },
                ],
            });
            res.json(games);
        })
        .post(tokenChecker, async (req, res) => {
            const { banner, image } = req.files;
            console.log(req.body);
            console.log(banner, image);

            res.json({ success: true });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, name } = req.body;
            const { banner, image } = req.files;

            if (!id) {
                return res.json({ success: false });
            }

            // Upload files to S3
            const requests = [];
            if (banner) requests.push(uploadFile(banner));
            if (image) requests.push(uploadFile(image));
            await Promise.all(requests);

            const game = {};
            if (name) game.name = name;
            if (banner) game.banner = banner.name;
            if (image) game.image = image.name;

            await db.Game.update(game, { where: { id } });

            res.json({ success: true });
        });

    router
        .route("/GameType")
        .post(async (req, res) => {
            const result = await db.GameType.create(req.body);
            res.json({ success: true, id: result.id });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, ...props } = req.body;
            if (!id) return res.json({ success: false });
            await db.GameType.update(props, { where: { id } });
            res.json({ success: false });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            if (!id) return res.json({ success: false });
            await db.GameType.destroy({ where: { id } });
            res.json({ success: true });
        });
};
