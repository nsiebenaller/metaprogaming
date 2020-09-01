const express = require("express"); // call express
const bodyParser = require("body-parser");
const os = require("os");
const db = require("./models");

const app = express(); // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000; // set our port

app.use(express.static("public"));
app.use(express.static("dist"));
app.get("/", (req, res) => {
    console.log("sending index.html");
    res.sendFile("/dist/index.html");
});
// ROUTES FOR OUR API
// =============================================================================
const router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use((req, res, next) => {
    // do logging
    console.log("App is running");
    next(); // make sure we go to the next routes and don't stop here
});

// ----------------------------------------------------
router
    .route("/Team")
    .get(async (req, res) => {
        const teams = await db.Team.findAll({
            include: [
                {
                    model: db.Player,
                    as: "players",
                    through: { attributes: [] },
                },
            ],
        });
        res.json(teams);
    })
    .post(bodyParser.json(), async (req, res) => {
        const result = await db.Team.create(req.body);
        res.json({ success: true });
    });
router
    .route("/Player")
    .get(async (req, res) => {
        const players = await db.Player.findAll();
        res.json(players);
    })
    .post(bodyParser.json(), async (req, res) => {
        const result = await db.Player.create(req.body);
        res.json({ success: true });
    });
router
    .route("/TeamPlayers")
    .post(bodyParser.json(), async (req, res) => {
        const team = await db.Team.findOne({ where: { id: req.body.TeamId } });
        if (!team) return res.json({ success: false });
        const player = await db.Player.findOne({
            where: { id: req.body.PlayerId },
        });
        if (!player) return res.json({ success: false });
        await player.addTeams(team);
        res.json({ success: true });
    })
    .delete(bodyParser.json(), async (req, res) => {
        const team = await db.Team.findOne({
            where: { id: req.body.TeamId },
            include: [
                {
                    model: db.Player,
                    as: "players",
                    through: { attributes: [] },
                },
            ],
        });
        if (!team) return res.json({ success: false });
        const player = await db.Player.findOne({
            where: { id: req.body.PlayerId },
            include: [
                {
                    model: db.Team,
                    as: "teams",
                    through: { attributes: [] },
                },
            ],
        });
        if (!player) return res.json({ success: false });

        const teams = player.teams.filter((x) => x.id !== team.id);
        await player.setTeams(teams);

        const players = team.players.filter((x) => x.id !== player.id);
        await team.setPlayers(players);

        res.json({ success: true });
    });
router
    .route("/Match")
    .get(async (req, res) => {
        const matches = await db.Match.findAll();
        res.json(matches);
    })
    .post(bodyParser.json(), async (req, res) => {
        const result = await db.Match.create(req.body);
        res.json({ success: true });
    })
    .delete(bodyParser.json(), async (req, res) => {
        const match = await db.Match.findOne({ where: { id: req.body.id } });
        if (!match) return res.json({ success: false });
        match.setTeams([]);
        await db.Match.destroy({ where: { id: req.body.id } });
        res.json({ success: true });
    });
router.route("/TeamMatches").post(bodyParser.json(), async (req, res) => {
    const team = await db.Team.findOne({ where: { id: req.body.TeamId } });
    if (!team) return res.json({ success: false });
    const match = await db.Match.findOne({
        where: { id: req.body.MatchId },
    });
    if (!match) return res.json({ success: false });
    await match.addTeams(team);
    res.json({ success: true });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`App listening on ${port}`);
