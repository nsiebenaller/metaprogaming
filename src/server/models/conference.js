"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Conference extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Conference.hasMany(models.SubConference, {
                as: "subconferences",
                foreignKey: "ConferenceId",
            });
            Conference.hasMany(models.Game, {
                as: "games",
                foreignKey: "ConferenceId",
            });
        }
    }
    Conference.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Conference",
        }
    );
    return Conference;
};
