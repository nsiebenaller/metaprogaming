module.exports = (router) => {
    router.route("/Role").get(async (req, res) => {
        const data = await req.db.Role.findAll();
        res.json(data);
    });
};
