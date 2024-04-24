const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_PORT } =
    require("../../config").dev;
const { Sequelize } = require("sequelize");
const chalk = require("chalk");

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: (...msg) => {
        return console.log(
            chalk.bold(chalk.bgBlue("[DB QUERY]:")),
            chalk.bold(chalk.green(msg[0]))
        );
    },
});