const fs = require("fs");
const path = require("path");
const app = require("../../src/app");
const chalk = require("chalk");

const routesParser = () => {
    const routesPath = path.join(__dirname, "../../src/routes");
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

    return routes;
};

const registerRoute = () => {
    const prefix = "/api";

    const routes = routesParser();
    for (const route of routes) {
        const routeGroup = `${prefix}/${route.group}`;
        app.use(routeGroup, route.route);
        console.log(
            chalk.bold("Registered route group: ") +
                chalk.bold(chalk.green(`/${route.group}`))
        );
    }
};

registerRoute();
routesParser();

module.exports = {
    registerRoute,
    routesParser,
};
