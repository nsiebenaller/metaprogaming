const { tokenChecker } = require("../tokenChecker");
const { removeFile, uploadFileWithName } = require("../managers/fileManager");

const withGameTypes = (db) => [
    {
        model: db.GameType,
        as: "gameTypes",
    },
];

async function getGames(db) {
    return await db.Game.findAll({
        include: withGameTypes(db),
    });
}

async function getGameById(db, id) {
    return await db.Game.findOne({ where: { id } });
}

async function createGame(db, game) {
    return await db.Game.create(game);
}

async function updateGameWithId(db, id, game) {
    return await db.Game.update(game, { where: { id } });
}

async function setBannerForGame(db, game, banner) {
    // Remove previous banner
    if (game.banner) {
        await removeFile(game.banner);
    }

    // Upload new file
    const { success, key } = await uploadFileWithName(
        banner,
        `game/banner-${game.id}`
    );
    if (!success) return false;

    // Update database
    await updateGameWithId(db, game.id, { banner: key });
}

async function setImageForGame(db, game, image) {
    // Remove previous image
    if (game.image) {
        await removeFile(game.image);
    }

    // Upload new file
    const { success, key } = await uploadFileWithName(
        image,
        `game/image-${game.id}`
    );
    if (!success) return false;

    // Update database
    await updateGameWithId(db, game.id, { image: key });
}

module.exports = (router) => {
    router
        .route("/Game")
        .get(async ({ db }, res) => {
            const games = await getGames(db);
            res.json(games);
        })
        .post(tokenChecker, async (req, res) => {
            const { db } = req;
            const { name } = req.body;
            const { image, banner } = req.files;

            // Validate request
            if (!name) {
                return res.json({
                    success: false,
                    messages: ["game must have a name"],
                });
            }
            const game = await createGame(db, { name });

            // Set banner for game
            if (banner) {
                await setBannerForGame(db, game, banner);
            }

            // Set image for game
            if (image) {
                await setImageForGame(db, game, image);
            }

            res.json({ success: true, messages: [] });
        })
        .patch(tokenChecker, async (req, res) => {
            const { db } = req;
            const { id, name } = req.body;
            const { image, banner } = req.files;

            if (!id) {
                return res.json({
                    success: false,
                    messages: ["the field 'id' is required"],
                });
            }

            // Find game to update
            const game = await getGameById(db, id);
            if (!game) {
                return res.json({ success: false, messages: [] });
            }

            // Set banner for game
            if (banner) {
                await setBannerForGame(db, game, banner);
            }

            // Set image for game
            if (image) {
                await setImageForGame(db, game, image);
            }

            // Set name for game
            if (name) {
                await updateGameWithId(db, game.id, { name });
            }

            res.json({ success: true, messages: [] });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            if (!id) {
                return res.json({
                    success: false,
                    message: ["id is a required field"],
                });
            }

            await req.db.Game.destroy({ where: { id } });
            res.json({ success: true });
        });

    router
        .route("/GameType")
        .post(async (req, res) => {
            const result = await req.db.GameType.create(req.body);
            res.json({ success: true, id: result.id });
        })
        .patch(tokenChecker, async (req, res) => {
            const { id, ...props } = req.body;
            if (!id) return res.json({ success: false });
            await req.db.GameType.update(props, { where: { id } });
            res.json({ success: true });
        })
        .delete(tokenChecker, async (req, res) => {
            const { id } = req.query;
            if (!id) return res.json({ success: false });
            await req.db.GameType.destroy({ where: { id } });
            res.json({ success: true });
        });
};
