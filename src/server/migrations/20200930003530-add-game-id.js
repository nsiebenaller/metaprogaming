"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("Seasons", "GameId", Sequelize.INTEGER);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Seasons", "GameId");
    },
};
