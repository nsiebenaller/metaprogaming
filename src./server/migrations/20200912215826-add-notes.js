"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("Matches", "notes", Sequelize.STRING);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Matches", "notes");
    },
};
