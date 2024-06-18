"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.User, {
                foreignKey: "seller",
            });

            Product.belongsToMany(models.Transaction, {
                through: models.TransactionDetail,
                foreignKey: "product",
                otherKey: "transaction",
            });
        }
    }
    Product.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            seller: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            weight: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "Product",
            tableName: "products",
            timestamps: true,
            underscored: true,
        }
    );
    return Product;
};
