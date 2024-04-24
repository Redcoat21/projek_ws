const { Sequelize } = require("sequelize");
const { MongoClient } = require("mongodb");
const { NODE_ENV, dev, test } = require("../../config");
const chalk = require("chalk");

const sequelize = {
    start: async (db) => {
        const development = NODE_ENV === "development";
        try {
            await db.authenticate();
            console.log(
                chalk.bold(
                    chalk.bgBlue("[DB INFO]:"),
                    chalk.green(
                        `Database connection has been estabilished succesfully using ${
                            development ? dev.DB_DIALECT : test.DB_DIALECT
                        } at ${
                            development
                                ? dev.DB_HOST +
                                  ":" +
                                  dev.DB_PORT +
                                  "/" +
                                  dev.DB_NAME
                                : dev.DB_DIALECT + ":memory"
                        }`
                    )
                )
            );
        } catch (error) {
            console.error(error);
            console.log(
                chalk.bold(
                    chalk.bgRed("[DB ERROR]:"),
                    chalk.red(
                        `Database connection ${
                            development ? dev.DB_DIALECT : test.DB_DIALECT
                        }`
                    )
                )
            );
        }
    },
    stop: async (db) => {
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
    },
};

const mongo = {
    start: async (client) => {
        try {
            await client.connect();
            chalk.bold(
                chalk.bgBlue("[DB INFO]:"),
                chalk.green(
                    `MongoDB connection has been estabilished succesfully`
                )
            );
        } catch (error) {
            console.error(error);
            console.log(
                chalk.bold(
                    chalk.bgRed("[DB ERROR]:"),
                    chalk.red("MongoDB connection failed")
                )
            );
        }
    },
    stop: async (client) => {
        await client.close();
        console.log(
            chalk.bold(
                chalk.bgBlue("[DB INFO]:"),
                chalk.green("MongoDB connection has been closed")
            )
        );
    },
};

const startDatabase = async (db) => {
    if (db instanceof Sequelize) {
        await sequelize.start(db);
    } else if (db instanceof MongoClient) {
        await mongo.start(db);
    }
};

const stopDatabase = async (db) => {
    if (db instanceof Sequelize) {
        await sequelize.stop(db);
    } else if (db instanceof MongoClient) {
        await mongo.stop(db);
    }
};
module.exports = { startDatabase, stopDatabase };
