require("dotenv").config();
const chalk = require("chalk");
const app = require("./app");

const { APP_PORT, APP_HOST, NODE_ENV } = require("./config");
const { dev, mongo, startDatabase } = require("./database");
const autoroutes = require("express-automatic-routes").default;
(async () => {
    console.log('hello world');
    await startDatabase(dev);

    // UNCOMMENT UNTUK START MONGO
    // await startDatabase(mongo);

    await (async () => {
        autoroutes(app, {
            dir: "./routes",
            log: true,
        });

        if(NODE_ENV.toLowerCase() === "production") {
            chalk.bold(
                chalk.bgBlue("[APP INFO]:"),
                chalk.blue("App is running on"),
                chalk.green("Production"),
                chalk.blue("mode")
            )
        }

        app.listen(APP_PORT, () => {
            console.log(
                chalk.bold(
                    chalk.bgBlue("[APP INFO]:"),
                    chalk.blue("Server is running on port: ") +
                        chalk.green(`http://${APP_HOST}:${APP_PORT}`)
                )
            );
        });
    })();
})();
