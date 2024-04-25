const { mongo } = require("../../config");

const { MongoClient } = require("mongodb");

const url = `mongodb://${mongo.DB_HOST}:${mongo.DB_PORT}/${mongo.DB_NAME}`;

module.exports = new MongoClient(url);
