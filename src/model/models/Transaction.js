"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        static associate(models) {
            Transaction.belongsTo(models.User, {
                foreignKey: "buyer",
            });

            Transaction.belongsToMany(models.Product, {
                through: models.TransactionDetail,
                foreignKey: "transaction",
                otherKey: "product",
            });
        }
    }
    Transaction.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                autoIncrement: false,
            },
            buyer: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            destination: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            deliveryPrice: {
                type: DataTypes.DECIMAL.UNSIGNED,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Transaction",
            timestamps: false,
            underscored: true,
            tableName: "transactions",
            updatedAt: false,
        }
    );
    return Transaction;
};
