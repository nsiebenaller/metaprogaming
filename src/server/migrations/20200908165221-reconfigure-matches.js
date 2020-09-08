"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("TeamMatches");
        await queryInterface.addColumn(
            "Matches",
            "FirstTeamId",
            Sequelize.INTEGER
        );
        await queryInterface.addColumn(
            "Matches",
            "SecondTeamId",
            Sequelize.INTEGER
        );
        await queryInterface.addColumn(
            "Matches",
            "firstTeamScore",
            Sequelize.INTEGER
        );
        await queryInterface.addColumn(
            "Matches",
            "secondTeamScore",
            Sequelize.INTEGER
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Matches", "FirstTeamId");
        await queryInterface.removeColumn("Matches", "SecondTeamId");
        await queryInterface.removeColumn("Matches", "firstTeamScore");
        await queryInterface.removeColumn("Matches", "secondTeamScore");
    },
};
