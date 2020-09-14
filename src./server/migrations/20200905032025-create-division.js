"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const Division = await queryInterface.createTable("Divisions", {
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
        Division.associate = (models) => {
            Division.belongsTo(models.Conference);
        };
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Divisions");
    },
};
