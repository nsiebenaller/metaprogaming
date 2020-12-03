const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

const PageComponent = {
    model: db.PageComponent,
    as: "components",
};

module.exports = (router) => {
    router
        .route("/Page")
        .get(async (req, res) => {
            const pages = await db.Page.findAll({ include: [PageComponent] });
            res.json(pages);
        })
        .post(tokenChecker, async (req, res) => {
            const result = await db.Page.create(req.body);
            res.json({ success: true, id: result.id });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, ...props } = req.body;
            await db.Page.update(props, { where: { id } });
            res.json({ success: true, id });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            await db.Page.destroy({ where: { id } });
            res.json({ success: true });
        });
    router
        .route("/PageComponent")
        .post(tokenChecker, async (req, res) => {
            const { content, type, PageId } = req.body;
            const result = await db.PageComponent.create({
                content,
                type,
                PageId,
            });
            res.json({ success: true, id: result.id });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, ...props } = req.body;
            if (!id) return res.json({ success: false });
            await db.PageComponent.update(props, { where: { id } });
            res.json({ success: true, messages: [] });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            if (!id) return res.json({ success: false });
            await db.PageComponent.destroy({ where: { id } });
            res.json({ success: true, messages: [] });
        });
};
