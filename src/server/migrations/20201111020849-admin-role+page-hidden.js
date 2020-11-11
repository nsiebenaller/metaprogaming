"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("Users", "admin", Sequelize.BOOLEAN);
        await queryInterface.addColumn("Pages", "hidden", Sequelize.BOOLEAN);
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
