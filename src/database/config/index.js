const { dev, test, prod } = require("../../config");
module.exports = {
    development: {
        username: dev.DB_USER,
        password: dev.DB_PASSWORD,
        database: dev.DB_NAME,
        host: dev.DB_HOST,
        port: dev.DB_PORT,
        dialect: dev.DB_DIALECT,
        dialectOptions: {
            bigNumberStrings: false,
        },
    },
    test: {
        database: test.DB_NAME,
        dialect: test.DB_DIALECT,
    },
    production: {
        username: prod.DB_USER,
        password: prod.DB_PASSWORD,
        database: prod.DB_NAME,
        host: prod.DB_HOST,
        port: prod.DB_PORT,
        dialect: prod.DB_DIALECT,
        dialectOptions: {
            bigNumberStrings: false,
            connectTimeout: 120000,
        },
    },
};
