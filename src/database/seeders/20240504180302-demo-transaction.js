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
            const destination = addressGenerator();
            const buyer =
                buyers[Math.floor(Math.random() * buyers.length)].dataValues
                    .username;
            transactions.push({
                id: id,
                destination: destination,
                buyer: buyer,
            });
        }
        return queryInterface.bulkInsert("transactions", transactions);
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete("transactions", null, {});
    },
};
