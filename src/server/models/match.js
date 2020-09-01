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
            Match.belongsToMany(models.Team, {
                as: "teams",
                through: "TeamMatches",
                foreignKey: {
                    name: "MatchId",
                    allowNull: false,
                },
                foreignKeyConstraint: true,
                otherKey: "TeamId",
                sourceKey: "id",
                onDelete: "CASCADE",
            });
        }
    }
    Match.init(
        {
            date: DataTypes.DATE,
            type: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Match",
        }
    );
    return Match;
};
