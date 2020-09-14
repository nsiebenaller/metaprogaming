"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const teams = [
            {
                id: 33,
                name: "Dean College",
                image: "/images/teams/image33.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 34,
                name: "Eastern Nazerene",
                image: "/images/teams/image34.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        await queryInterface.bulkInsert("Teams", teams);
    },

    down: async (queryInterface, Sequelize) => {},
};
