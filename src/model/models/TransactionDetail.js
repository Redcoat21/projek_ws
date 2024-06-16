"use strict";
const { Model, Sequelize} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TransactionDetail extends Model {
        static associate(models) {
            TransactionDetail.belongsTo(models.Product, {
                foreignKey: 'product',
            });

            TransactionDetail.belongsTo(models.Transaction, {
                foreignKey: 'transaction',
            });
        }
    }
    TransactionDetail.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                autoIncrement: false,
            },
            transaction: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            product: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            subtotal: {
                type: DataTypes.DECIMAL.UNSIGNED,
                allowNull: false,
            },
            deliveryDate: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "TransactionDetail",
            tableName: "transaction_details",
            underscored: true,
            timestamps: false
        }
    );
    return TransactionDetail;
};
