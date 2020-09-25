"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            "Games",
            "ConferenceId",
            Sequelize.INTEGER
        );
        await queryInterface.addColumn("Games", "banner", Sequelize.STRING);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Matches", "ConferenceId");
        await queryInterface.removeColumn("Matches", "banner");
    },
};
