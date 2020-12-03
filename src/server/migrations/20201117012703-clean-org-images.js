"use strict";
const db = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const bucket = "https://metaprogaming.s3.amazonaws.com/";
        const orgs = await db.Organization.findAll();
        const promises = [];
        orgs.forEach(async (org) => {
            if (!org.image.includes(bucket)) {
                const image = `${bucket}${org.image}`;
                promises.push(
                    db.Organization.update(
                        { image: image },
                        {
                            where: { id: org.id },
                        }
                    )
                );
            }
        });
        await Promise.all(promises);
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
