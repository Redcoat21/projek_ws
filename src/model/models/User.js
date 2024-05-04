"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Role, {
                foreignKey: "role",
            });

            User.belongsTo(models.Subscription, {
                foreignKey: "subscriber",
            });

            User.hasMany(models.Transaction, {
                foreignKey: "buyer",
            });
        }
    }
    User.init(
        {
            username: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.STRING(255),
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(80),
                allowNull: false,
            },
            phone_number: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            api_key: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            profile_picture: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            role: {
                type: DataTypes.CHAR(3),
                allowNull: false,
            },
            refresh_token: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            balance: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "User",
            timestamps: true,
            underscored: true,
            paranoid: true,
            tableName: "users",
        }
    );
    return User;
};
