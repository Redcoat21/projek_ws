const { Sequelize } = require("sequelize");
const chalk = require("chalk");
const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_DIALECT,
    DB_PORT,
} = require("../config");

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    port: DB_PORT,
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: (...msg) => {
        return console.log(
            chalk.bold(chalk.bgBlue("[DB QUERY]:")) +
                chalk.greenBright(" " + chalk.bold(msg[0]))
        );
    },
});
