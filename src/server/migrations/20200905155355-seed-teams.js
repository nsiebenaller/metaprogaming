"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("Teams", "image", Sequelize.STRING);
        const teams = [
            {
                id: 1,
                name: "Boise State",
                image: "/images/teams/image1.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: "Bay Path University",
                image: "/images/teams/image2.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                name: "Becker College",
                image: "/images/teams/image3.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                name: "Carroll University",
                image: "/images/teams/image4.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                name: "Central Methodist University",
                image: "/images/teams/image5.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 6,
                name: "Champlain College",
                image: "/images/teams/image6.gif",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 7,
                name: "Dean College",
                image: "/images/teams/image7.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 8,
                name: "Durham College",
                image: "/images/teams/image8.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 9,
                name: "Eastern Nazarene College",
                image: "/images/teams/image9.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 10,
                name: "Georgia State University",
                image: "/images/teams/image10.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 11,
                name: "Highland Community College",
                image: "/images/teams/image11.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 12,
                name: "Hocking College",
                image: "/images/teams/image12.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 13,
                name: "Hood College",
                image: "/images/teams/image13.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 14,
                name: "Howard Community College",
                image: "/images/teams/image14.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 15,
                name: "Lakeland University",
                image: "/images/teams/image15.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 16,
                name: "Lebanon Valley College",
                image: "/images/teams/image16.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 17,
                name: "Lesley University",
                image: "/images/teams/image17.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 18,
                name: "Lourdes University",
                image: "/images/teams/image18.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 19,
                name: "Midland University",
                image: "/images/teams/image19.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 20,
                name: "Mid American Christian University",
                image: "/images/teams/image20.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        await queryInterface.bulkInsert("Teams", teams);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Teams", "image");
        await queryInterface.bulkDelete("Teams", null, {});
    },
};
