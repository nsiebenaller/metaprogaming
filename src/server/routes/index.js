const matchRouter = require("./match");
const playerRouter = require("./player");
const securityRouter = require("./security");
const teamRouter = require("./team");
const teamMatchesRouter = require("./teamMatches");
const teamPlayersRouter = require("./teamPlayers");
const userRouter = require("./user");

module.exports = (router) => {
    matchRouter(router);
    playerRouter(router);
    securityRouter(router);
    teamRouter(router);
    teamMatchesRouter(router);
    teamPlayersRouter(router);
    userRouter(router);
};
