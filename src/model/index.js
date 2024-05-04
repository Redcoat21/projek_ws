const fs = require("fs");
const path = require("path");
const { DataTypes } = require("sequelize");

const { dev: sequelize } = require("../database");
const modelsSource = path.join(__dirname, "models");
const models = fs
    .readdirSync(modelsSource)
    .filter((file) => file.endsWith(".js"));

const db = {};
for (const model of models) {
    const [fileName, extension] = model.split(".");
    db[fileName] = require(`./models/${model}`)(sequelize, DataTypes);
}

for (const key in db) {
    if (db[key].associate) {
        db[key].associate(db);
    }
}

module.exports = db;
