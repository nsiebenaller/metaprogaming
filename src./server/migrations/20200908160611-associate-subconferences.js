"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("TeamSubConferences", {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            SubConferenceId: {
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
        await queryInterface.dropTable("TeamSubConferences");
    },
};
