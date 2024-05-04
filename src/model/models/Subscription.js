"use strict";
const { DateTime } = require("luxon");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Subscription extends Model {
        static associate(models) {
            Subscription.hasMany(models.User, {
                foreignKey: "subscriber",
            });
        }
    }
    Subscription.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                autoIncrement: false,
            },
            subscriber: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            tier: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: "subscription_tiers",
                    key: "id",
                },
            },
            subscribedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DateTime.now().toJSDate(),
            },
            expiredAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DateTime.now().plus({ months: 1 }).toJSDate(),
            },
        },
        {
            sequelize,
            modelName: "Subscription",
            timestamps: false,
            underscored: true,
            tableName: "subscriptions",
        }
    );
    return Subscription;
};
