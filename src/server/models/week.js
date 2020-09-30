"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Week extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Week.belongsTo(models.Season);
        }
    }
    Week.init(
        {
            name: DataTypes.STRING,
            start: DataTypes.DATE,
            end: DataTypes.DATE,
            SeasonId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Week",
        }
    );
    return Week;
};
