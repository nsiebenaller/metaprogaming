"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Team extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Team.belongsToMany(models.Player, {
                as: "players",
                through: "TeamPlayers",
                foreignKey: "TeamId",
                otherKey: "PlayerId",
                sourceKey: "id",
            });
            Team.belongsToMany(models.Match, {
                as: "matches",
                through: "TeamMatches",
                foreignKey: "TeamId",
                otherKey: "MatchId",
                sourceKey: "id",
            });
        }
    }
    Team.init(
        {
            name: DataTypes.STRING,
            image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Team",
        }
    );
    return Team;
};
