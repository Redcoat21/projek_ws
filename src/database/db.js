const { PrismaClient } = require("@prisma/client");
const chalk = require("chalk");
const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_DIALECT,
    DB_PORT,
} = require("../config");

const prisma = new PrismaClient();

module.exports = prisma;
