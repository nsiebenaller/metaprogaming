const db = require("../models");
const { tokenChecker } = require("../tokenChecker");
const { uploadFile, removeFile, getExt } = require("../managers/fileManager");

const GameType = {
    model: db.GameType,
    as: "gameTypes",
};

module.exports = (router) => {
    router
        .route("/Game")
        .get(async (req, res) => {
            const games = await db.Game.findAll({
                include: [GameType],
            });
            res.json(games);
        })
        .post(tokenChecker, async (req, res) => {
            const { name } = req.body;
            const { image, banner } = req.files;

            let game = {};
            try {
                game = await db.Game.create({ name });
            } catch (e) {
                console.error(e);
                return res.json({ success: false, messages: [] });
            }

            // Upload files to S3
            let bannerResp = null;
            if (banner) {
                const ext = getExt(banner.name);
                if (!ext) {
                    return res.json({
                        success: false,
                        messages: ["unable to retrieve extension from banner"],
                    });
                }
                banner.name = `game/banner-${game.id}.${ext}`;
                bannerResp = await uploadFile(banner);
            }
            let imageResp = null;
            if (image) {
                const ext = getExt(image.name);
                if (!ext) {
                    return res.json({
                        success: false,
                        messages: ["unable to retrieve extension from image"],
                    });
                }
                imageResp = await uploadFile(image);
            }

            let bannerKey = "";
            if (bannerResp && bannerResp.success) {
                bannerKey = bannerResp.key;
            }

            let imageKey = "";
            if (imageResp && imageResp.success) {
                imageKey = imageResp.key;
            }
            await db.Game.update(
                { banner: bannerKey, image: imageKey },
                { where: { id: game.id } }
            );

            res.json({ success: true, messages: [] });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, name } = req.body;
            const { image, banner } = req.files;

            if (!id) {
                return res.json({ success: false });
            }

            let game = {};
            try {
                game = await db.Game.findOne({ where: { id } });
            } catch (e) {
                console.error(e);
                return res.json({ success: false, messages: [] });
            }

            // Upload files to S3
            let bannerResp = null;
            if (banner) {
                if (game.banner) {
                    await removeFile(game.banner);
                }
                const ext = getExt(banner.name);
                if (!ext) {
                    return res.json({
                        success: false,
                        messages: ["unable to retrieve extension from banner"],
                    });
                }
                banner.name = `game/banner-${game.id}.${ext}`;
                bannerResp = await uploadFile(banner);
            }
            let imageResp = null;
            if (image) {
                if (game.image) {
                    await removeFile(game.image);
                }
                const ext = getExt(image.name);
                if (!ext) {
                    return res.json({
                        success: false,
                        messages: ["unable to retrieve extension from image"],
                    });
                }
                image.name = `game/img-${game.id}.${ext}`;
                imageResp = await uploadFile(image);
            }

            let bannerKey = "";
            if (bannerResp && bannerResp.success) {
                bannerKey = bannerResp.key;
                await db.Game.update(
                    { banner: bannerKey },
                    { where: { id: game.id } }
                );
            }

            let imageKey = "";
            if (imageResp && imageResp.success) {
                imageKey = imageResp.key;
                await db.Game.update(
                    { image: imageKey },
                    { where: { id: game.id } }
                );
            }

            if (name) {
                await db.Game.update({ name }, { where: { id: game.id } });
            }

            res.json({ success: true });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            if (!id) {
                return res.json({
                    success: false,
                    message: ["id is a required field"],
                });
            }

            await db.Game.destroy({ where: { id } });
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
            res.json({ success: true });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            if (!id) return res.json({ success: false });
            await db.GameType.destroy({ where: { id } });
            res.json({ success: true });
        });
};
