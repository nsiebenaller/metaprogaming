"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Player extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Player.belongsToMany(models.Team, {
                as: "teams",
                through: "TeamPlayers",
                foreignKey: "PlayerId",
                otherKey: "TeamId",
                sourceKey: "id",
            });
            Player.belongsToMany(models.Game, {
                as: "games",
                through: "PlayerGames",
                foreignKey: "PlayerId",
                otherKey: "GameId",
                sourceKey: "id",
            });
        }
    }
    Player.init(
        {
            name: DataTypes.STRING,
            gamerTag: DataTypes.STRING,
            discord: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Player",
        }
    );
    return Player;
};
