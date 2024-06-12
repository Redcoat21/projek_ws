"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class SubscriptionTier extends Model {
        static associate(models) {
            SubscriptionTier.hasMany(models.Subscription, {
                foreignKey: "tier",
            });
        }
    }
    SubscriptionTier.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER.UNSIGNED,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "SubscriptionTier",
            tableName: "subscription_tiers",
            underscored: true,
            timestamps: false,
        }
    );
    return SubscriptionTier;
};
