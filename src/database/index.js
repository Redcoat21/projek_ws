const { startDatabase, stopDatabase } = require("./config");
const db = require("./db");
module.exports = {
    db: db,
    startDatabase,
    stopDatabase,
};
