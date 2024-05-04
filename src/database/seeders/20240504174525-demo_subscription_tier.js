"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("subscription_tiers", [
            {
                name: "Free",
                price: 0,
            },
            {
                name: "Premium",
                price: 75000,
            },
            {
                name: "Silver",
                price: 100000,
            },
            {
                name: "Gold",
                price: 175000,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete("subscription_tiers", null, {});
    },
};
