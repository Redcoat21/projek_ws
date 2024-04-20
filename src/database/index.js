const { Sequelize } = require("sequelize");
const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_DIALECT,
} = require("../config");

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    port: DB_PORT,
    host: DB_HOST,
    dialect: DB_DIALECT,
});
