"use strict";
const { fakerID_ID: faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { Role } = require("../../model");
const { Op } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const roles = await Role.findAll({
            attributes: ["id"],
            where: {
                id: {
                    [Op.not]: "ADM",
                },
            },
        });
        const users = [];
        for (let i = 0; i < 97; i++) {
            const gender = Math.round(Math.random()) === 0 ? "male" : "female";

            const firstName = faker.person.firstName(gender);
            const lastName = faker.person.lastName(gender);
            const name = `${firstName} ${lastName}`;
            const email = faker.internet.email({ firstName, lastName });
            const username = faker.internet.userName({ firstName, lastName });
            const phoneNumber = faker.phone.number();
            const password = faker.internet.password({ memorable: true });
            const role =
                roles[Math.floor(Math.random() * roles.length)].dataValues.id;
            const balance = faker.finance.amount();
            users.push({
                name: name,
                email: email,
                username: username,
                phone_number: phoneNumber,
                password: bcrypt.hashSync(password, 10),
                role: role,
                balance: balance,
            });

            // users.push(
            //     {
            //         name: "test admin",
            //         email: "admin@gmail.com",
            //         username: "admin",
            //         phone_number: faker.phone.number(),
            //         password: bcrypt.hashSync("admin123", 10),
            //         role: "ADM",
            //     },
            //     {
            //         name: "test seller",
            //         email: "seller@gmail.com",
            //         username: "seller",
            //         phone_number: faker.phone.number(),
            //         password: bcrypt.hashSync("seller123", 10),
            //         role: "SLR",
            //     },
            //     {
            //         name: "test user",
            //         email: "user@gmail.com",
            //         username: "user",
            //         phone_number: faker.phone.number(),
            //         password: bcrypt.hashSync("user123", 10),
            //         role: "USR",
            //     }
            // );
        }
        return queryInterface.bulkInsert("users", users);
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete("users", null, {});
    },
};
