"use strict";
const { fakerID_ID: faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
const { User } = require("../../model");
const { DateTime } = require("luxon");

const addressGenerator = () => {
    const country = "Indonesia";
    const city = faker.location.city();
    const state = faker.location.state();
    const address = faker.location.streetAddress();
    const zipCode = faker.location.zipCode();

    const buildingNumber = faker.location.buildingNumber();

    return `${address} No ${buildingNumber}, ${zipCode}, ${city}, ${state}, ${country}`;
};

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
            const origin = addressGenerator();
            const destination = addressGenerator();
            const deliveryPrice = faker.commerce.price({
                min: 20000,
                max: 200000,
            });
            const buyer =
                buyers[Math.floor(Math.random() * buyers.length)].dataValues
                    .username;
            const arrival = faker.date.future({
                refDate: DateTime.now(),
            });
            transactions.push({
                id: id,
                origin: origin,
                destination: destination,
                delivery_price: deliveryPrice,
                buyer: buyer,
                arrival_date: arrival,
            });
        }
        return queryInterface.bulkInsert("transactions", transactions);
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete("transactions", null, {});
    },
};
