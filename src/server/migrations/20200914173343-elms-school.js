"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const teams = [
            {
                id: 35,
                name: "Elms College 'Blazers' ",
                image: "/images/teams/image35.jpg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        const associations = [
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 35,
            },
        ];
        await queryInterface.bulkInsert("TeamSubConferences", associations);
        await queryInterface.bulkInsert("Teams", teams);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
