const { dev, prod, NODE_ENV } = require("../../config")
const { Sequelize } = require("sequelize");
const chalk = require("chalk");

const db = NODE_ENV.toLowerCase() === "development" ? dev : NODE_ENV.toLowerCase() === "production" ? prod : test;
module.exports = new Sequelize(db.DB_NAME, db.DB_USER, db.DB_PASSWORD, {
    host: db.DB_HOST,
    port: db.DB_PORT,
    dialect: db.DB_DIALECT,
    logging: (...msg) => {
        return console.log(
            chalk.bold(chalk.bgBlue("[DB QUERY]:")),
            chalk.bold(chalk.green(msg[0]))
        );
    },
});
