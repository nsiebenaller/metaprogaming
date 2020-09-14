const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router.route("/Role").get(async (req, res) => {
        const data = await db.Role.findAll();
        res.json(data);
    });
};
