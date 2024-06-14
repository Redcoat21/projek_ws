"use strict";
const { Model, Sequelize} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TransactionDetail extends Model {
        static associate(models) {}
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
            arrivalDate: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            deliveryPrice: {
                type: DataTypes.DECIMAL.UNSIGNED,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "TransactionDetail",
        }
    );
    return TransactionDetail;
};
