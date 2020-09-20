"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            "Matches",
            "AwayTeamId",
            Sequelize.INTEGER
        );
        await queryInterface.addColumn(
            "Matches",
            "HomeTeamId",
            Sequelize.INTEGER
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Matches", "AwayTeamId");
        await queryInterface.removeColumn("Matches", "HomeTeamId");
    },
};
