"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Conferences");
        await queryInterface.dropTable("Divisions");
        await queryInterface.dropTable("SubConferences");
        await queryInterface.dropTable("OrganizationSubConferences");
        await queryInterface.removeColumn("Matches", "DivisionId");
        await queryInterface.removeColumn("Games", "ConferenceId");
    },

    down: async (queryInterface, Sequelize) => {},
};
