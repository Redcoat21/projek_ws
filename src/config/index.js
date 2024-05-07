require("dotenv").config();
module.exports = {
    dev: {
        DB_HOST: process.env.DEV_DB_HOST,
        DB_NAME: process.env.DEV_DB_NAME,
        DB_USER: process.env.DEV_DB_USER,
        DB_PASSWORD: process.env.DEV_DB_PASSWORD,
        DB_PORT: process.env.DEV_DB_PORT,
        DB_NAME: process.env.DEV_DB_NAME,
        DB_DIALECT: process.env.DEV_DB_DIALECT,
    },
    test: {
        DB_NAME: process.env.TEST_DB_NAME,
        DB_DIALECT: process.env.TEST_DB_DIALECT,
    },
    mongo: {
        DB_NAME: process.env.MONGO_DB_NAME,
        DB_HOST: process.env.MONGO_DB_HOST,
        DB_PORT: process.env.MONGO_DB_PORT,
    },
    NODE_ENV: process.env.NODE_ENV,
    APP_HOST: process.env.APP_HOST,
    APP_PORT: process.env.APP_PORT,
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY,
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
};
