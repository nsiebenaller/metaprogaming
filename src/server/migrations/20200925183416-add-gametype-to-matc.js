"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            "Matches",
            "GameTypeId",
            Sequelize.INTEGER
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Matches", "GameTypeId");
    },
};
