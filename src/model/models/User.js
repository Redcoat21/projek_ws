"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Role, {
                foreignKey: "role",
            });

            User.hasMany(models.Subscription, {
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
            phoneNumber: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            apiKey: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            profilePicture: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            role: {
                type: DataTypes.CHAR(3),
                allowNull: false,
            },
            refreshToken: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            balance: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                defaultValue: 0,
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
