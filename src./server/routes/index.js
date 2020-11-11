const db = require("../models");
const { tokenChecker } = require("../tokenChecker");

const gameRouter = require("./game");
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
const userRouter = require("./user");
const seasonRouter = require("./season");

module.exports = (router) => {
    gameRouter(router);
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
    pageRouter(router);
};

function pageRouter(router) {
    router
        .route("/Page")
        .get(async (req, res) => {
            const pages = await db.Page.findAll();
            res.json(pages);
        })
        .post(async (req, res) => {
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
}
