"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class SubConference extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            SubConference.belongsTo(models.Conference);
            SubConference.hasMany(models.Division, {
                foreignKey: "SubConferenceId",
                as: "divisions",
            });
            SubConference.belongsToMany(models.Organization, {
                as: "organizations",
                through: "OrganizationSubConferences",
                foreignKey: "SubConferenceId",
                otherKey: "OrganizationId",
                sourceKey: "id",
            });
        }
    }
    SubConference.init(
        {
            name: DataTypes.STRING,
            ConferenceId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "SubConference",
        }
    );
    return SubConference;
};
