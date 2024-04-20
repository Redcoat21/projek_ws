const DIALECT = "mysql";

module.exports = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_DIALECT: DIALECT,
    DB_PASSWORD: process.env.DB_PASSWORD,
    APP_HOST: process.env.APP_HOST,
    APP_PORT: process.env.APP_PORT,
};
