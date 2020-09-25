"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class GameType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            GameType.belongsTo(models.Game);
        }
    }
    GameType.init(
        {
            name: DataTypes.STRING,
            GameId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "GameType",
        }
    );
    return GameType;
};
