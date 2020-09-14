const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

module.exports = (router) => {
    router.route("/Conference").get(async (req, res) => {
        const data = await db.Conference.findAll({
            include: [
                {
                    model: db.SubConference,
                    as: "subconferences",
                    include: [
                        {
                            model: db.Division,
                            as: "divisions",
                        },
                        {
                            model: db.Team,
                            as: "teams",
                        },
                    ],
                },
            ],
        });
        res.json(data);
    });
};
