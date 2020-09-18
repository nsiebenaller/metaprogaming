"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const teams = [
            {
                id: 38,
                name: "Upper Iowa University",
                image: "/images/teams/image38.jpg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        const associations = [
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 38,
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
