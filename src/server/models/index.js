"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const configs = require(__dirname + "/../config/config.js")[env];

// Global variables
const databases = {};
let loadedModelFiles = false;
let modelFiles = [];

// Load multiple configs
if (Array.isArray(configs)) {
    configs.forEach((config) => {
        if (!config.tag) return;
        databases[config.tag] = loadConfig(config);
    });
} else {
    databases.default = loadConfig(configs);
}

console.log("Loaded Databases:", Object.keys(databases).join(", "));
module.exports = databases;

// Loads a sequelize instance given a config
function loadConfig(config) {
    // Instatiate sequelize instance
    let sequelize;
    if (config.use_env_variable) {
        sequelize = new Sequelize(process.env[config.use_env_variable], config);
    } else {
        sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config
        );
    }

    // Load models
    loadModelFiles();
    const db = Object.assign({}, loadModels(sequelize));

    // Associate models to database
    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
}

function loadModelFiles() {
    if (loadedModelFiles) return;
    modelFiles = fs.readdirSync(__dirname).filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        );
    });
    loadedModelFiles = true;
}
function loadModels(sequelize) {
    const models = {};
    modelFiles.forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        models[model.name] = model;
    });
    return models;
}
