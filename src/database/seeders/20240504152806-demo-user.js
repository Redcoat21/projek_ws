"use strict";
const { fakerID_ID: faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { Role } = require("../../model");
const { Op } = require("sequelize");
const { addressGenerator } = require("../../../utility/address");
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
            const origin = addressGenerator();
            users.push({
                name: name,
                email: email,
                username: username,
                phone_number: phoneNumber,
                password: bcrypt.hashSync(password, 10),
                role: role,
                balance: balance,
                address: origin
            });
        }

        users.push({
            name: 'test user',
            email: 'testuser@test.com',
            username: 'testuser',
            password: bcrypt.hashSync('testuser123', 10),
            role: 'USR',
            balance: 200000,
            address: 'Jl. Ngagel Jaya Tengah No.73-77, 60284, Surabaya, Jawa Timur, Indonesia',
            phone_number: '(+62) 877 4091 2578'
        });

        users.push({
            name: 'test seller',
            email: 'testseller@test.com',
            username: 'testseller',
            password: bcrypt.hashSync('testseller123', 10),
            role: 'SLR',
            balance: 100000,
            address: 'Jl Mangga Besar 11/8, 11170, Jakarta Barat, DKI Jakarta, Indonesia',
            phone_number: '(+62) 811 17000 7136'
        });

        users.push({
            name: 'test admin',
            email: 'testadmin@test.com',
            username: 'testadmin',
            password: bcrypt.hashSync('testadmin123', 10),
            role: 'ADM',
            balance: 0,
            address: 'Jl Kaligarang 2 B Lt 1, 50231, Semarang, Jawa Tengah, Indonesia',
            phone_number: '(+62) 812 2506 7171'
        });

        return queryInterface.bulkInsert("users", users);
    },

    async down(queryInterface, Sequelize) {
        return await queryInterface.bulkDelete("users", null, {});
    },
};
