const SequelizeMock = require("sequelize-mock");

const dbMock = new SequelizeMock();

module.exports = dbMock.sequelize;
module.exports.DataTypes = dbMock.DataTypes;
