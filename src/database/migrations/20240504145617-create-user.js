"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            username: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(255),
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            balance: {
                type: Sequelize.DECIMAL,
                allowNull: false,
                defaultValue: 0,
            },
            password: {
                type: Sequelize.STRING(80),
                allowNull: false,
            },
            phone_number: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            api_key: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            profile_picture: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            role: {
                type: Sequelize.CHAR(3),
                allowNull: false,
                references: {
                    model: "roles",
                    key: "id",
                },
            },
            refresh_token: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            },
            updated_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("users");
    },
};
