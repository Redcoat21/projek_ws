"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("roles", [
            {
                id: "USR",
                name: "User",
            },
            {
                id: "ADM",
                name: "Admin",
            },
            {
                id: "SLR",
                name: "Seller",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete("roles", null, {});
    },
};
