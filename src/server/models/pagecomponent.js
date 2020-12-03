"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class PageComponent extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            PageComponent.belongsTo(models.Page);
        }
    }
    PageComponent.init(
        {
            content: DataTypes.STRING,
            type: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "PageComponent",
        }
    );
    return PageComponent;
};
