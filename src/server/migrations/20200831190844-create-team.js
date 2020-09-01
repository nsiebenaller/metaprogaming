"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const Teams = await queryInterface.createTable("Teams", {
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
        Teams.associate = (models) => {
            Teams.hasMany(models.Player, { through: "TeamPlayers" });
        };
        return Teams;
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Teams");
    },
};
