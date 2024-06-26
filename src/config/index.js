require("dotenv").config();
module.exports = {
    dev: {
        DB_HOST: process.env.DEV_DB_HOST,
        DB_NAME: process.env.DEV_DB_NAME,
        DB_USER: process.env.DEV_DB_USER,
        DB_PASSWORD: process.env.DEV_DB_PASSWORD,
        DB_PORT: process.env.DEV_DB_PORT,
        DB_DIALECT: process.env.DEV_DB_DIALECT,
    },
    test: {
        DB_NAME: process.env.TEST_DB_NAME,
        DB_DIALECT: process.env.TEST_DB_DIALECT,
    },
    prod: {
        DB_HOST: process.env.PROD_DB_HOST,
        DB_NAME: process.env.PROD_DB_NAME,
        DB_USER: process.env.PROD_DB_USER,
        DB_PASSWORD: process.env.PROD_DB_PASSWORD,
        DB_PORT: process.env.PROD_DB_PORT,
        DB_DIALECT: process.env.PROD_DB_DIALECT,
    },
    NODE_ENV: process.env.NODE_ENV,
    APP_HOST: process.env.APP_HOST,
    APP_PORT: process.env.APP_PORT,
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY,
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
    RAJAONGKIR_BASE_URL: 'https://api.rajaongkir.com/starter',
    RAJAONGKIR_API_KEY: process.env.RAJAONGKIR_API_KEY
};
