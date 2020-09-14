"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const associations = [
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 1,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 2,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 3,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 4,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 5,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 6,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 7,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 8,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 9,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 10,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 11,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 12,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 13,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 14,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 15,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 16,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 17,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 18,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 19,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 20,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 21,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 22,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 23,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 24,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 25,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 1,
                TeamId: 26,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 2,
                TeamId: 27,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 2,
                TeamId: 28,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 2,
                TeamId: 29,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 2,
                TeamId: 30,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 2,
                TeamId: 31,
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
                SubConferenceId: 2,
                TeamId: 32,
            },
        ];
        await queryInterface.bulkInsert("TeamSubConferences", associations);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("TeamSubConferences", null, {});
    },
};
