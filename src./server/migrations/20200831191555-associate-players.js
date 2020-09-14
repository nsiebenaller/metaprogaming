"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("TeamPlayers", {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            TeamId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            PlayerId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("TeamPlayers");
    },
};
