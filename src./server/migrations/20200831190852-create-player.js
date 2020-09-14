"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const Players = await queryInterface.createTable("Players", {
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
        Players.associate = (models) => {
            Players.belongsToMany(models.Team, { through: "TeamPlayers" });
        };
        return Players;
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Players");
    },
};
