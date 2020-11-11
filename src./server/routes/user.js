const db = require("../models");
const bcrypt = require("bcryptjs");
const { tokenChecker } = require("../tokenChecker");

const saltRounds = 10;

module.exports = (router) => {
    router
        .route("/User")
        .get(async (req, res) => {
            const { id } = req.query;

            const whereClause = { where: {} };
            if (id) whereClause.where.id = id;

            const users = await db.User.findAll({
                ...whereClause,
                include: [
                    {
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
                        ],
                    },
                ],
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

            const matchUsername = await db.User.findAll({
                where: { username },
            });
            if (matchUsername.length > 0) {
                return res.json({
                    success: false,
                    messages: [
                        `User with username (${username}) already exists`,
                    ],
                });
            }

            const matchEmail = await db.User.findAll({ where: { email } });
            if (matchEmail.length > 0) {
                return res.json({
                    success: false,
                    messages: [`User with email (${email}) already exists`],
                });
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

            const props = {};
            if (username) props.username = username;
            if (email) props.email = email;
            if (password) props.password = await encrypt(password);
            props.admin = admin;

            await db.User.update(props, { where: { id } });

            res.json({
                success: true,
            });
        });
};

function encrypt(text) {
    return new Promise((resolve) => {
        bcrypt.hash(text, saltRounds, function (err, hash) {
            resolve(hash);
        });
    });
}
