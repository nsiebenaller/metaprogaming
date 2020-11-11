"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Game extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Game.hasMany(models.Match, {
                as: "matches",
                foreignKey: "GameId",
            });
            Game.belongsToMany(models.Player, {
                as: "players",
                through: "PlayerGames",
                foreignKey: "GameId",
                otherKey: "PlayerId",
                sourceKey: "id",
            });
            Game.hasMany(models.GameType, {
                foreignKey: "GameId",
                as: "gameTypes",
            });
        }
    }
    Game.init(
        {
            name: DataTypes.STRING,
            image: DataTypes.STRING,
            banner: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Game",
        }
    );
    return Game;
};
