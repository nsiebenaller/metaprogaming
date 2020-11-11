"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Season extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Season.hasMany(models.Week, {
                foreignKey: "SeasonId",
                as: "weeks",
            });
        }
    }
    Season.init(
        {
            name: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            GameTypeId: DataTypes.INTEGER,
            GameId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Season",
        }
    );
    return Season;
};
