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
            Match.belongsTo(models.Organization, {
                as: "awayOrg",
                foreignKey: "AwayOrganizationId",
            });
            Match.belongsTo(models.Organization, {
                as: "homeOrg",
                foreignKey: "HomeOrganizationId",
            });
            Match.belongsTo(models.Game);
            Match.belongsTo(models.GameType);
            Match.belongsTo(models.Division);
            Match.belongsTo(models.Team, {
                as: "awayTeam",
                foreignKey: "AwayTeamId",
            });
            Match.belongsTo(models.Team, {
                as: "homeTeam",
                foreignKey: "HomeTeamId",
            });
        }
    }
    Match.init(
        {
            date: DataTypes.DATE,
            type: DataTypes.STRING,
            notes: DataTypes.STRING,
            GameId: DataTypes.INTEGER,
            DivisionId: DataTypes.INTEGER,
            AwayOrganizationId: DataTypes.INTEGER,
            HomeOrganizationId: DataTypes.INTEGER,
            firstTeamScore: DataTypes.INTEGER,
            secondTeamScore: DataTypes.INTEGER,
            GameTypeId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Match",
        }
    );
    return Match;
};
