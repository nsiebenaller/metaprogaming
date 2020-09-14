"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const teams = [
            {
                id: 36,
                name: "University of Montana",
                image: "/images/teams/image36.jpg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 37,
                name: "Mount Saint Mary's",
                image: "/images/teams/image37.jpg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        const associations = [
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 2,
                TeamId: 36,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 37,
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
