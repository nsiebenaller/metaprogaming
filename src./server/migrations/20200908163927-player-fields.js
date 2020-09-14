"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("Players", "gamerTag", Sequelize.STRING);
        await queryInterface.addColumn("Players", "discord", Sequelize.STRING);
        await queryInterface.createTable("PlayerGames", {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            PlayerId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            GameId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Players", "gamerTag");
        await queryInterface.removeColumn("Players", "discord");
        await queryInterface.dropTable("PlayerGames");
    },
};
