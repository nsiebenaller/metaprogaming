const db = require("../models");
const bcrypt = require("bcryptjs");
const { tokenChecker } = require("../tokenChecker");

const saltRounds = 10;

const PlayerAndJoins = {
    model: db.Player,
    as: "players",
    through: { attributes: [] },
    include: [
        {
            model: db.Game,
            as: "games",
            through: { attributes: [] },
        },
        {
            model: db.Role,
            as: "roles",
            through: { attributes: [] },
        },
        {
            model: db.Organization,
            as: "organizations",
            through: { attributes: [] },
        },
    ],
};

module.exports = (router) => {
    router
        .route("/User")
        .get(async (req, res) => {
            const { id, email } = req.query;

            const whereClause = { where: {} };
            if (id) whereClause.where.id = id;
            if (email) whereClause.where.email = email;

            const users = await db.User.findAll({
                ...whereClause,
                include: [PlayerAndJoins],
            });

            res.json(
                users.map(({ dataValues }) => ({
                    ...dataValues,
                    password: null,
                }))
            );
        })
        .post(tokenChecker, async (req, res) => {
            const { username, email, password, admin } = req.body;

            if (!username || username === "") {
                return res.json({
                    success: false,
                    messages: ["A username must be provided"],
                });
            }

            if (userWithUsername(username)) {
                return res.json({
                    success: false,
                    messages: [
                        `User with username (${username}) already exists`,
                    ],
                });
            }

            if (email && email !== "") {
                if (userWithEmail(email)) {
                    return res.json({
                        success: false,
                        messages: [`User with email (${email}) already exists`],
                    });
                }
            }

            const encryptedPassword = await encrypt(password);
            await db.User.create({
                username,
                email,
                password: encryptedPassword,
                admin,
            });

            res.json({ success: true, messages: [] });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, username, email, password, admin } = req.body;

            if (!id) {
                return res.json({
                    success: false,
                    messages: ["An id must be provided"],
                });
            }

            const userWithId = await db.User.findOne({
                where: { id },
            });
            if (!userWithId) {
                return res.json({
                    success: false,
                    messages: ["No user found with id"],
                });
            }

            // Create Patch User
            const props = {};
            if (username && username !== userWithId.username) {
                if (userWithUsername(username)) {
                    return res.json({
                        success: false,
                        messages: [
                            `User with username (${username}) already exists`,
                        ],
                    });
                }
                props.username = username;
            }
            if (email && email !== userWithId.email) {
                if (userWithEmail(email)) {
                    return res.json({
                        success: false,
                        messages: [`User with email (${email}) already exists`],
                    });
                }
                props.email = email;
            }
            if (password) {
                props.password = await encrypt(password);
            }
            props.admin = admin;

            await db.User.update(props, { where: { id } });

            res.json({
                success: true,
            });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            if (!id) {
                return res.json({
                    success: false,
                    messages: ["An id must be provided"],
                });
            }

            const user = await db.User.findOne({
                where: { id },
                include: [PlayerAndJoins],
            });
            if (!user) {
                return res.json({
                    success: false,
                    messages: ["Cannot find user with given id"],
                });
            }

            const promises = [];
            user.players.forEach((player) => {
                promises.push(deletePlayer(player.id));
            });
            await Promise.all(promises);

            user.setPlayers([]);
            user.destroy();
            return res.json({
                success: true,
                messages: [],
            });
        });

    router
        .route("/UserPlayer")
        .post(tokenChecker, async (req, res) => {
            // Validate parameters
            const { userId, player } = req.body;
            if (!userId || !player) {
                return res.json({
                    success: false,
                    messages: [`'userId' & 'player' are required fields`],
                });
            }

            // Find user
            const user = await db.User.findOne({
                where: { id: userId },
            });
            if (!user) {
                return res.json({
                    success: false,
                    messages: [`No user found for id: ${userId}`],
                });
            }

            // Create player
            const playerInput = {
                name: player.name,
                gamerTag: player.gamerTag,
                discord: player.discord,
            };
            const newPlayer = await db.Player.create(playerInput);
            if (!newPlayer) {
                return res.json({
                    success: false,
                    messages: [`Error saving player`],
                });
            }

            // Add Player for User
            user.addPlayer(newPlayer);

            // Set Organizations for Player
            if (player.organizations) {
                const ids = player.organizations.map((x) => x.id);
                const orgs = await db.Organization.findAll({
                    where: { id: ids },
                });
                newPlayer.setOrganizations(orgs);
            }

            // Set Games for Player
            if (player.games) {
                const ids = player.games.map((x) => x.id);
                const games = await db.Game.findAll({ where: { id: ids } });
                newPlayer.setGames(games);
            }

            // Set Roles for Player
            if (player.roles) {
                const ids = player.roles.map((x) => x.id);
                const roles = await db.Role.findAll({ where: { id: ids } });
                newPlayer.setRoles(roles);
            }

            newPlayer.save();
            res.json({ success: true, messages: [] });
        })
        .patch(tokenChecker, async (req, res) => {})
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            return res.json(deletePlayer(id));
        });
};

function encrypt(text) {
    return new Promise((resolve) => {
        bcrypt.hash(text, saltRounds, function (err, hash) {
            resolve(hash);
        });
    });
}

async function deletePlayer(id) {
    const player = await db.Player.findOne({
        where: { id },
    });
    if (!player) {
        return {
            success: false,
            messages: [`No player found for id: ${id}`],
        };
    }
    player.setUsers([]);
    player.setGames([]);
    player.setOrganizations([]);
    player.setRoles([]);
    player.save();
    player.destroy();
    return { success: true, messages: [] };
}

async function userWithUsername(username) {
    const match = await db.User.findAll({
        where: { username },
    });
    if (match.length > 0) {
        return true;
    }
    return false;
}

async function userWithEmail(email) {
    const match = await db.User.findAll({
        where: { email },
    });
    if (match.length > 0) {
        return true;
    }
    return false;
}
