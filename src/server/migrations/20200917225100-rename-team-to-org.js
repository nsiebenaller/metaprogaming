"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.renameTable("Teams", "Organizations");
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.renameTable("Organizations", "Teams");
    },
};
