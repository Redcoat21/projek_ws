const { DB_DIALECT, DB_HOST, DB_PORT, DB_NAME, DB_USER } = require("../config");
const chalk = require("chalk");

const startDatabase = async (db) => {
    try {
        await db.authenticate();

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
                    `${
                        db.dialect.connectionManager.dialectName
                    } is running on ${db.config.host ?? "sqlite"}:${
                        db.config.port ?? "memory"
                    }/${DB_NAME ?? ""} AS ${DB_USER ?? ""}`
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

const stopDatabase = async (db) => {
    await db.close();
};
module.exports = { startDatabase, stopDatabase };
