const { tokenChecker } = require("../tokenChecker");
const { uploadFile, removeFile, Bucket } = require("../managers/fileManager");

module.exports = (router) => {
    router
        .route("/Image")
        .get(async ({ db }, res) => {
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
            src.name = `images/${src.name}`;
            const resp = await uploadFile(src);
            if (!resp.success) {
                return res.json({
                    success: false,
                    messages: ["failed to upload to S3"],
                });
            }

            // Create DB Record
            const image = {
                src: resp.key,
                type: type,
            };
            await req.db.Image.create(image);

            res.json({ success: true });
        })
        .patch(tokenChecker, async ({ db, body }, res) => {
            const { id, ...props } = body;
            await db.Image.update(props, { where: { id } });
            res.json({ success: true, id });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            if (!id) {
                return res.json({
                    success: true,
                    messages: ["no id provided"],
                });
            }

            const image = await req.db.Image.findOne({ where: { id } });
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

            await req.db.Image.destroy({ where: { id } });
            res.json({ success: true });
        });
};
