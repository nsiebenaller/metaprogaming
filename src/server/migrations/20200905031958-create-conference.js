"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const Conferences = await queryInterface.createTable("Conferences", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
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
        Conferences.associate = (models) => {
            Conferences.hasMany(models.Division, {
                foreignKey: "ConferenceId",
            });
        };
        return Conferences;
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Conferences");
    },
};
