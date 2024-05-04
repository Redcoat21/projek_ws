const fs = require("fs");
const path = require("path");

const chalk = require("chalk");

const routesParser = () => {
    const routesPath = path.join(__dirname, "../../src/routes");

    try {
        const routeFiles = fs
            .readdirSync(routesPath)
            .filter((routeFile) => routeFile.endsWith(".js"));

        const routes = [];
        for (const routeFile of routeFiles) {
            const routeGroup = routeFile.replace(".js", "");
            const route = require(path.join(routesPath, routeFile));
            routes.push({
                group: routeGroup,
                route: route,
            });
        }
    } catch (error) {
        return null;
    }

    return routes;
};

const registerRoute = (application) => {
    const app = application;
    const prefix = "/api";

    const routes = routesParser();

    if (routes == null) {
        console.log(
            chalk.bold(
                chalk.bgRed("[APP ERROR]:"),
                chalk.red("No route files found in src/routes")
            )
        );
    } else {
        for (const route of routes) {
            const routeGroup = `${prefix}/${route.group}`;
            app.use(routeGroup, route.route);
            console.log(
                chalk.bold(
                    chalk.bgBlue("[APP INFO]:"),
                    chalk.blue("Registered route group:"),
                    chalk.green(`${routeGroup}`)
                )
            );
        }
    }
};

module.exports = {
    registerRoute,
    routesParser,
};
