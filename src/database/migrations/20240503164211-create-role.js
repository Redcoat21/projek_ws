"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("roles", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.CHAR(3),
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("roles");
    },
};
