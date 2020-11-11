"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Organization extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Organization.belongsToMany(models.Player, {
                as: "players",
                through: "OrganizationPlayers",
                foreignKey: "OrganizationId",
                otherKey: "PlayerId",
                sourceKey: "id",
            });
            Organization.hasMany(models.Team, {
                as: "teams",
                foreignKey: "OrganizationId",
            });
        }
    }
    Organization.init(
        {
            name: DataTypes.STRING,
            image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Organization",
        }
    );
    return Organization;
};
