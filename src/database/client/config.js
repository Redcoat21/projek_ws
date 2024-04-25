const { Sequelize } = require("sequelize");
const { MongoClient } = require("mongodb");
const { NODE_ENV, dev, test } = require("../../config");
const { sendDbInfo, sendDbError } = require("../../../utility/messaging/log");

const sequelize = {
    start: async (db) => {
        const development = NODE_ENV === "development";
        try {
            await db.authenticate();
            sendDbInfo(
                `Database connection has been estabilished succesfully using ${
                    development ? dev.DB_DIALECT : test.DB_DIALECT
                } at ${
                    development
                        ? dev.DB_HOST + ":" + dev.DB_PORT + "/" + dev.DB_NAME
                        : dev.DB_DIALECT + ":memory"
                }`
            );
        } catch (error) {
            if (error.original.code === "ECONNREFUSED") {
                sendDbError(
                    `Database connection ${
                        development ? dev.DB_DIALECT : test.DB_DIALECT
                    } failed to connect!`
                );
            }
        }
    },
    stop: async (db) => {
        await db.close();
        sendDbInfo(
            `${
                NODE_ENV === "development" ? dev.DB_DIALECT : test.DB_DIALECT
            } Database connection has been closed`
        );
    },
};

const mongo = {
    start: async (client) => {
        try {
            await client.connect();
            sendDbInfo("MongoDB connection has been estabilished succesfully");
        } catch (error) {
            console.error(error);
            sendDbError("MongoDB connection failed");
        }
    },
    stop: async (client) => {
        await client.close();
        sendDbInfo("MongoDB connection has been closed");
    },
};

const startDatabase = async (db) => {
    if (db instanceof Sequelize) {
        await sequelize.start(db);
    } else if (db instanceof MongoClient) {
        await mongo.start(db);
    } else {
        sendDbError("Invalid Database Type!");
    }
};

const stopDatabase = async (db) => {
    if (db instanceof Sequelize) {
        await sequelize.stop(db);
    } else if (db instanceof MongoClient) {
        await mongo.stop(db);
    }
};
module.exports = { startDatabase, stopDatabase };
