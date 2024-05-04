"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            Role.hasMany(models.User, {
                foreignKey: "role",
            });
        }
    }
    Role.init(
        {
            id: {
                type: DataTypes.CHAR(3),
                alllowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Role",
            tableName: "roles",
            timestamps: false,
            underscored: true,
        }
    );
    return Role;
};
