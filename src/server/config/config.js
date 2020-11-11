require("dotenv").config();
module.exports = {
    production: {
        username: "postgres",
        password: process.env.RDS_PWD,
        database: "meta",
        host: process.env.RDS_HOST,
        dialect: "postgres",
    },
    development: {
        username: "postgres",
        password: process.env.RDS_PWD || "postgres",
        database: "meta",
        host: process.env.RDS_HOST || "127.0.0.1",
        dialect: "postgres",
    },
};
