"use strict";
const { fakerID_ID: faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
const { SubscriptionTier, User } = require("../../model");
module.exports = {
    async up(queryInterface, Sequelize) {
        const subscriptions = [];
        const tiers = await SubscriptionTier.findAll({
            attributes: ["id"],
        });
        const users = await User.findAll({
            attributes: ["username"],
            where: {
                role: "USR",
            },
        });

        for (let i = 0; i < users.length / 2; i++) {
            const tier =
                tiers[Math.floor(Math.random() * (tiers.length - 1))].dataValues
                    .id;
            const id = faker.string.uuid();
            subscriptions.push({
                subscriber: users[i].dataValues.username,
                tier: tier,
                id: id,
            });
        }
        return queryInterface.bulkInsert("subscriptions", subscriptions);
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete("subscriptions", null, {});
    },
};
