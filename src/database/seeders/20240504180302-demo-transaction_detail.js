"use strict";
const { fakerID_ID: faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
const { Transaction, Product } = require("../../model");
const { DateTime } = require("luxon");

module.exports = {
    async up(queryInterface, Sequelize) {
        const transactionDetails = [];
        const transactions = await Transaction.findAll();
        const products = await Product.findAll();

        for (const transaction of transactions) {
            for (let i = 0; i < 4; i++) {
                const id = faker.string.uuid();
                const product =
                    products[Math.floor(Math.random() * products.length)]
                        .dataValues;
                const quantity = Math.floor(Math.random() * 10) + 1;
                transactionDetails.push({
                    id: id,
                    transaction: transaction.dataValues.id,
                    product: product.id,
                    quantity: quantity,
                    subtotal: quantity * product.price,
                });
            }
        }

        return queryInterface.bulkInsert(
            "transaction_details",
            transactionDetails
        );
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete("transaction_details", null, {});
    },
};
