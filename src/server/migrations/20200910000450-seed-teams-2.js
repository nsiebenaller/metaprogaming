"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Teams", null, {});

        const teams = [
            {
                id: 1,
                name: "Becker College",
                image: "/images/teams/image1.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: "Carroll University",
                image: "/images/teams/image2.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                name: "Central Methodist University",
                image: "/images/teams/image3.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                name: "Champlain College",
                image: "/images/teams/image4.gif",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                name: "Durham College",
                image: "/images/teams/image5.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            {
                id: 6,
                name: "Hocking College",
                image: "/images/teams/image6.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 7,
                name: "Hood College",
                image: "/images/teams/image7.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 8,
                name: "Howard Community College",
                image: "/images/teams/image8.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 9,
                name: "Illinois Wesleyan",
                image: "/images/teams/image9.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 10,
                name: "Jackson College",
                image: "/images/teams/image10.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 11,
                name: "Kansas Wesleyan",
                image: "/images/teams/image11.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 12,
                name: "Lakeland University",
                image: "/images/teams/image12.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 13,
                name: "Lesley University",
                image: "/images/teams/image13.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 14,
                name: "META",
                image: "/images/teams/image14.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 15,
                name: "Midland University",
                image: "/images/teams/image15.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 16,
                name: "Monroe College",
                image: "/images/teams/image16.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 17,
                name: "New England College",
                image: "/images/teams/image17.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 18,
                name: "Newberry College",
                image: "/images/teams/image18.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 19,
                name: "Northcentral Technical College",
                image: "/images/teams/image19.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 20,
                name: "Northern Essec Community College",
                image: "/images/teams/image20.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 21,
                name: "Randolph Macon",
                image: "/images/teams/image21.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 22,
                name: "Southern Mississippi",
                image: "/images/teams/image22.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 23,
                name: "St Ambrose University",
                image: "/images/teams/image23.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 24,
                name: "Tiffin University",
                image: "/images/teams/image24.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 25,
                name: "University of Rio Grande",
                image: "/images/teams/image25.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 26,
                name: "Valparaiso",
                image: "/images/teams/image26.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 27,
                name: "Boise State",
                image: "/images/teams/image27.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 28,
                name: "Cal State Sacramento",
                image: "/images/teams/image28.gif",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 29,
                name: "Colorado College",
                image: "/images/teams/image29.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 30,
                name: "CSU Dominguez Hills",
                image: "/images/teams/image30.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 31,
                name: "Marymount California University",
                image: "/images/teams/image31.jpeg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 32,
                name: "Westcliff Univeristy",
                image: "/images/teams/image32.png",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
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
        ];
        await queryInterface.bulkInsert("Teams", teams);
        await queryInterface.bulkInsert("TeamSubConferences", associations);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Teams", null, {});
    },
};
