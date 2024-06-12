const { Sequelize } = require("sequelize");
const { NODE_ENV, dev, test, prod } = require("../../config");
const chalk = require("chalk");

const instance = NODE_ENV.toLowerCase() === "development" ? dev : NODE_ENV.toLowerCase() === "production" ? prod : test;
const startDatabase = async (db) => {
    try {
        await db.authenticate();
        console.log(
            chalk.bold(
                chalk.bgBlue("[DB INFO]:"),
                chalk.green(`Database connection has been estabilished succesfully at ${instance.DB_HOST}:${instance.DB_PORT}/${instance.DB_NAME} as ${instance.DB_USER}!`)
            )
        );
    } catch(error) {
        console.log(
            chalk.bold(
                chalk.bgRed("[DB ERROR]:"),
                chalk.red(
                    `Database connection failed when attempting to connect to ${instance.DB_HOST}:${instance.DB_PORT}/${instance.DB_NAME} as ${instance.DB_USER}`
                )
            )
        );
        console.error(error);
    }
};

const stopDatabase = async (db) => {
    await db.close();
    console.log(
        chalk.bold(
            chalk.bgBlue("[DB INFO]:"),
            chalk.green(
                `${
                    NODE_ENV === "development"
                        ? dev.DB_DIALECT
                        : test.DB_DIALECT
                } Database connection has been closed`
            )
        )
    );
};
module.exports = { startDatabase, stopDatabase };
