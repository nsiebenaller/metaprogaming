"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("TeamMatches", {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            MatchId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            TeamId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("TeamMatches");
    },
};
