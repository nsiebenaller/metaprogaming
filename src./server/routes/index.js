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
const PageRouter = require("./PageRouter");
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
    PageRouter(router);
};
