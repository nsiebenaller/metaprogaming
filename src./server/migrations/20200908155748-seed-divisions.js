"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Divisions", null, {});
        await queryInterface.bulkInsert(
            "Divisions",
            [
                {
                    id: 1,
                    name: "Division 1",
                    SubConferenceId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 2,
                    name: "Division 2",
                    SubConferenceId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 3,
                    name: "Division 1",
                    SubConferenceId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 4,
                    name: "Division 2",
                    SubConferenceId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Divisions", null, {});
    },
};
