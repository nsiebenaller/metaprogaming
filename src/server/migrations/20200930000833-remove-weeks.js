"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Weeks");
    },

    down: async (queryInterface, Sequelize) => {},
};
