"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Weeks", "SubConferenceId");
        await queryInterface.addColumn(
            "Weeks",
            "DivisionId",
            Sequelize.INTEGER
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            "Weeks",
            "SubConferenceId",
            Sequelize.INTEGER
        );
        await queryInterface.removeColumn("Weeks", "DivisionId");
    },
};
