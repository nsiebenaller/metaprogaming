const db = require("../models");
const { tokenChecker } = require("../tokenChecker");
const { uploadFile, removeFile, Bucket } = require("../managers/fileManager");
const site = process.env.THEME || "generic";

module.exports = (router) => {
    router
        .route("/Image")
        .get(async (req, res) => {
            const images = await db.Image.findAll();
            res.json(images);
        })
        .post(tokenChecker, async (req, res) => {
            const { type } = req.body;
            const { src } = req.files;

            // Validate Input
            if (!src || !type) {
                return res.json({
                    success: false,
                    messages: ["missing parameter(s)"],
                });
            }

            // Upload to S3
            src.name = `${site}/images/${src.name}`;
            const success = await uploadFile(src);
            if (!success) {
                return res.json({
                    success: false,
                    messages: ["failed to upload to S3"],
                });
            }

            // Create DB Record
            const image = {
                src: `${Bucket}${src.name}`,
                type: type,
            };
            await db.Image.create(image);

            res.json({ success: true });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            if (!id) {
                return res.json({
                    success: true,
                    messages: ["no id provided"],
                });
            }

            const image = await db.Image.findOne({ where: { id } });
            if (!image) {
                return res.json({
                    success: false,
                    messages: ["no entity for id"],
                });
            }

            const path = image.src.replace(Bucket, "");
            const success = await removeFile(path);
            if (!success) {
                return res.json({
                    success: false,
                    messages: ["failed to delete in S3"],
                });
            }

            await db.Image.destroy({ where: { id } });
            res.json({ success: true });
        });
};
