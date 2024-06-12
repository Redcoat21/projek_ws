const { startDatabase, stopDatabase } = require("./client/config");
module.exports = {
    dev: require("./client/mysql"),
    test: require("./client/sqlite"),
    startDatabase,
    stopDatabase,
};
