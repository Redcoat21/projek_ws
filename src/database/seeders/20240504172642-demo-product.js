"use strict";
const { fakerID_ID: faker } = require("@faker-js/faker");
const { User } = require("../../model");
const { ServerDescriptionChangedEvent } = require("mongodb");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const products = [];
        const sellers = await User.findAll({
            attributes: ["username"],
            where: {
                role: "SLR",
            },
        });

        for (let i = 0; i < 100; i++) {
            const name = faker.commerce.productName();
            const description = faker.commerce.productDescription();
            const price = faker.commerce.price({
                min: 10000,
                max: 30000000,
            });
            const id = faker.string.uuid();
            const seller =
                sellers[Math.floor(Math.random() * sellers.length)].dataValues
                    .username;
            const weight = Math.floor(Math.random() * 20);
            products.push({
                id: id,
                name: name,
                description: description,
                price: price,
                seller: seller,
                weight: weight
            });
        }
        return queryInterface.bulkInsert("products", products);
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete("products", null, {});
    },
};
