"use strict";
const { DateTime } = require("luxon");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("transaction_details", {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                autoIncrement: false,
            },
            transaction: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "transactions",
                    key: "id",
                },
            },
            product: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "products",
                    key: "id",
                },
            },
            quantity: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            subtotal: {
                type: Sequelize.DECIMAL.UNSIGNED,
                allowNull: false,
            },
            arrival_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            delivery_price: {
                type: Sequelize.DECIMAL.UNSIGNED,
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("transaction_details");
    },
};
