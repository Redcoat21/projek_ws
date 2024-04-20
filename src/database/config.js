const { DB_DIALECT, DB_HOST, DB_PORT, DB_NAME, DB_USER } = require("../config");
const sequelize = require("./db");
const chalk = require("chalk");

const startDatabase = async () => {
    try {
        await sequelize.authenticate();

        console.log(
            chalk.bold(
                chalk.bgGreen("[DB INFO]:"),
                chalk.green(
                    "Database connection has been established successfully."
                )
            )
        );
        console.log(
            chalk.bold(
                chalk.bgGreen("[DB INFO]:"),
                chalk.green(
                    `${DB_DIALECT} is running on ${DB_HOST}:${DB_PORT}/${DB_NAME} AS ${DB_USER}`
                )
            )
        );
    } catch (error) {
        console.error(error);
        console.error(
            chalk.bold(
                chalk.bgRed("[DB ERROR]:"),
                chalk.red("Database connection failed!")
            )
        );
    }
};

const stopDatabase = async () => {
    await sequelize.close();
};
module.exports = { startDatabase, stopDatabase };
