require("dotenv").config();
const chalk = require("chalk");
const app = require("./app");

const { APP_PORT, APP_HOST } = require("./config");
const { startDatabase } = require("./database");

startDatabase();

app.listen(APP_PORT, () => {
    console.log(
        chalk.bold(
            chalk.bgBlue("[APP INFO]:"),
            chalk.blue("Server is running on port: ") +
                chalk.green(`http://${APP_HOST}:${APP_PORT}`)
        )
    );
});
