const db = require("../models");
const { tokenChecker } = require("../tokenChecker");
const { uploadFile } = require("../index");

module.exports = (router) => {
    router
        .route("/Game")
        .get(async (req, res) => {
            const games = await db.Game.findAll();
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
};
