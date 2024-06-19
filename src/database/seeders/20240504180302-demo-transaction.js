"use strict";
const { fakerID_ID: faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
const { User } = require("../../model");
const { DateTime } = require("luxon");
const { addressGenerator } = require("../../../utility/address");

module.exports = {
    async up(queryInterface, Sequelize) {
        const transactions = [];
        const buyers = await User.findAll({
            attributes: ["username"],
            where: {
                role: "USR",
            },
        });
        for (let i = 0; i < 20; i++) {
            const id = faker.string.uuid();
            const destination = addressGenerator();
            const buyer =
                buyers[Math.floor(Math.random() * buyers.length)].dataValues
                    .username;
            const deliveryPrice = faker.commerce.price({
                min: 20000,
                max: 50000
            });
            transactions.push({
                id: id,
                destination: destination,
                buyer: buyer,
                delivery_price: deliveryPrice
            });
        }
        return queryInterface.bulkInsert("transactions", transactions);
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete("transactions", null, {});
    },
};
