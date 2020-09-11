"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("PlayerRoles", {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            RoleId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            PlayerId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("PlayerRoles");
    },
};
