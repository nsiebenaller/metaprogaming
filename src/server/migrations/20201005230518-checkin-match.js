"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            "Matches",
            "awayCheckedIn",
            Sequelize.BOOLEAN
        );
        await queryInterface.addColumn(
            "Matches",
            "homeCheckedIn",
            Sequelize.BOOLEAN
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Matches", "awayCheckedIn");
        await queryInterface.removeColumn("Matches", "homeCheckedIn");
    },
};
