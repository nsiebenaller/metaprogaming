const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

const GameRouter = require("./gameRouter");
const imageRouter = require("./image");
const matchRouter = require("./match");
const playerRouter = require("./player");
const playerGamesRouter = require("./playerGames");
const playerRolesRouter = require("./playerRoles");
const roleRouter = require("./role");
const securityRouter = require("./security");
const teamRouter = require("./team");
const orgRouter = require("./org");
const orgPlayersRouter = require("./orgPlayers");
const PageRouter = require("./PageRouter");
const userRouter = require("./user");
const seasonRouter = require("./season");

module.exports = (router) => {
    GameRouter(router);
    imageRouter(router);
    matchRouter(router);
    playerRouter(router);
    playerGamesRouter(router);
    playerRolesRouter(router);
    roleRouter(router);
    securityRouter(router);
    teamRouter(router);
    orgRouter(router);
    orgPlayersRouter(router);
    userRouter(router);
    seasonRouter(router);
    PageRouter(router);
    TemplateRouter(router);
};

function TemplateRouter(router) {
    router
        .route("/Template")
        .get(async (req, res) => {
            const results = await db.Template.findAll();
            res.json(results);
        })
        .post(tokenChecker, async (req, res) => {
            const { name, content } = req.body;
            const result = await db.Template.create({ name, content });
            res.json({ success: true, id: result.id });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, ...props } = req.body;
            await db.Template.update(props, { where: { id } });
            res.json({ success: true, id });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            await db.Template.destroy({ where: { id } });
            res.json({ success: true });
        });
}
