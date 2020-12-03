"use strict";
const db = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const bucket = "https://metaprogaming.s3.amazonaws.com/";
        const games = await db.Game.findAll();
        const promises = [];
        games.forEach(async (game) => {
            if (!game.image.includes(bucket)) {
                const image = `${bucket}${game.image}`;
                promises.push(
                    db.Game.update(
                        { image: image },
                        {
                            where: { id: game.id },
                        }
                    )
                );
            }
            if (!game.banner.includes(bucket)) {
                const banner = `${bucket}${game.banner}`;
                promises.push(
                    db.Game.update(
                        { banner: banner },
                        {
                            where: { id: game.id },
                        }
                    )
                );
            }
        });
        await Promise.all(promises);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
