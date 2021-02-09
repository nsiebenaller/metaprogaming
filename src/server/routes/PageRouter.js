const { tokenChecker } = require("../tokenChecker");

const PageComponent = (db) => ({
    model: db.PageComponent,
    as: "components",
});

module.exports = (router) => {
    router
        .route("/Page")
        .get(async (req, res) => {
            const pages = await req.db.Page.findAll({
                include: [PageComponent(req.db)],
            });
            res.json(pages);
        })
        .post(tokenChecker, async (req, res) => {
            const result = await req.db.Page.create(req.body);
            res.json({ success: true, id: result.id });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, ...props } = req.body;
            await req.db.Page.update(props, { where: { id } });
            res.json({ success: true, id });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            await req.db.Page.destroy({ where: { id } });
            res.json({ success: true });
        });
    router
        .route("/PageComponent")
        .post(tokenChecker, async (req, res) => {
            const { content, type, PageId } = req.body;
            const result = await req.db.PageComponent.create({
                content,
                type,
                PageId,
            });
            res.json({ success: true, id: result.id });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, ...props } = req.body;
            if (!id) return res.json({ success: false });
            await req.db.PageComponent.update(props, { where: { id } });
            res.json({ success: true, messages: [] });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            if (!id) return res.json({ success: false });
            await req.db.PageComponent.destroy({ where: { id } });
            res.json({ success: true, messages: [] });
        });
};
