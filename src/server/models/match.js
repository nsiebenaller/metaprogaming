"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Match extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Match.belongsTo(models.Team, {
                as: "firstTeam",
                foreignKey: "FirstTeamId",
            });
            Match.belongsTo(models.Team, {
                as: "secondTeam",
                foreignKey: "SecondTeamId",
            });
            Match.belongsTo(models.Game);
            Match.belongsTo(models.Division);
        }
    }
    Match.init(
        {
            date: DataTypes.DATE,
            type: DataTypes.STRING,
            GameId: DataTypes.INTEGER,
            DivisionId: DataTypes.INTEGER,
            FirstTeamId: DataTypes.INTEGER,
            SecondTeamId: DataTypes.INTEGER,
            firstTeamScore: DataTypes.INTEGER,
            secondTeamScore: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Match",
        }
    );
    return Match;
};
