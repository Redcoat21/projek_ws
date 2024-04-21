const { startDatabase, stopDatabase } = require("./config");
const { dev, test } = require("./db");
module.exports = {
    dbDev: dev,
    dbTest: test,
    startDatabase,
    stopDatabase,
};
