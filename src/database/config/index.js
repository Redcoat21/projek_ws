const fs = require('fs');

const { dev, test } = require('../../config');

console.log(dev);

module.exports = {
    development: {
        username: dev.DB_USER,
        password: dev.DB_PASSWORD,
        database: dev.DB_NAME,
        host: dev.DB_HOST,
        port: dev.DB_PORT,
        dialect: dev.DB_DIALECT,
        dialectOptions: {
            bigNumberStrings: false
        }
    },
    test: {
        database: test.DB_NAME,
        dialect: test.DB_DIALECT,
    },
    production: {
        username: dev.DB_USER,
        password: dev.DB_PASSWORD,
        database: dev.DB_NAME,
        host: dev.DB_HOST,
        port: dev.DB_PORT,
        dialect: dev.DB_DIALECT,
        dialectOptions: {
            bigNumberStrings: false
        }
    },
}
