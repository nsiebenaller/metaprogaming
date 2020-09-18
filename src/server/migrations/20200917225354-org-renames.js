"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.renameTable("TeamPlayers", "OrganizationPlayers");
        await queryInterface.renameColumn(
            "OrganizationPlayers",
            "TeamId",
            "OrganizationId"
        );
        await queryInterface.renameTable(
            "TeamSubConferences",
            "OrganizationSubConferences"
        );
        await queryInterface.renameColumn(
            "OrganizationSubConferences",
            "TeamId",
            "OrganizationId"
        );
        await queryInterface.renameColumn(
            "Matches",
            "FirstTeamId",
            "AwayOrganizationId"
        );
        await queryInterface.renameColumn(
            "Matches",
            "SecondTeamId",
            "HomeOrganizationId"
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.renameTable("OrganizationPlayers", "TeamPlayers");
        await queryInterface.renameTable("OrganizationMatches", "TeamMatches");
        await queryInterface.renameTable(
            "OrganizationSubConferences",
            "TeamSubConferences"
        );
    },
};
