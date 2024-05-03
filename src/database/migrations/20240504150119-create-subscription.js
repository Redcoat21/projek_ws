"use strict";
const { DateTime } = require("luxon");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("subscriptions", {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                autoIncrement: false,
            },
            subscriber: {
                type: Sequelize.STRING(255),
                allowNull: false,
                references: {
                    model: "users",
                    key: "username",
                },
            },
            tier: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: "subscription_tiers",
                    key: "id",
                },
            },
            subscribed_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn("NOW"),
            },
            expired_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: DateTime.now().plus({ months: 1 }).toJSDate(),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("subscriptions");
    },
};
