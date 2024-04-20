const fs = require("fs");
const path = require("path");

const chalk = require("chalk");

const routesParser = (app) => {
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

const registerRoute = (application) => {
    const app = application;
    const prefix = "/api";

    const routes = routesParser();
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

    return application;
};

module.exports = {
    registerRoute,
    routesParser,
};
