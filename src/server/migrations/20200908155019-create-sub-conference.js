"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("SubConferences", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            ConferenceId: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
        await queryInterface.removeColumn("Divisions", "ConferenceId");
        await queryInterface.addColumn(
            "Divisions",
            "SubConferenceId",
            Sequelize.INTEGER
        );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("SubConferences");
    },
};
