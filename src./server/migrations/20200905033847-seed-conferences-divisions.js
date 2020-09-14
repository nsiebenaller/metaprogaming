"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Conferences",
            [
                {
                    id: 1,
                    name: "NECC",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
        await queryInterface.bulkInsert(
            "Divisions",
            [
                {
                    id: 1,
                    name: "Division 1",
                    ConferenceId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 2,
                    name: "Division 2",
                    ConferenceId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Conferences", null, {});
        await queryInterface.bulkDelete("Divisions", null, {});
    },
};
