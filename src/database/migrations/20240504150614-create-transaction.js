"use strict";
const { DateTime } = require("luxon");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("transactions", {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                autoIncrement: false,
            },
            buyer: {
                type: Sequelize.STRING(255),
                allowNull: false,
                references: {
                    model: "users",
                    key: "username",
                },
            },
            destination: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            delivery_price: {
                type: Sequelize.DECIMAL.UNSIGNED,
                allowNull: false,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("transactions");
    },
};
