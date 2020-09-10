const conferenceRouter = require("./conference");
const gameRouter = require("./game");
const gameMatchesRouter = require("./gameMatches");
const matchRouter = require("./match");
const playerRouter = require("./player");
const playerGamesRouter = require("./playerGames");
const securityRouter = require("./security");
const teamRouter = require("./team");
const teamMatchesRouter = require("./teamMatches");
const teamPlayersRouter = require("./teamPlayers");
const userRouter = require("./user");
const weekRouter = require("./week");

module.exports = (router) => {
    conferenceRouter(router);
    gameRouter(router);
    gameMatchesRouter(router);
    matchRouter(router);
    playerRouter(router);
    playerGamesRouter(router);
    securityRouter(router);
    teamRouter(router);
    teamMatchesRouter(router);
    teamPlayersRouter(router);
    userRouter(router);
    weekRouter(router);
};
