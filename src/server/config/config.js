require("dotenv").config();
module.exports = {
    production: {
        tag: "default",
        username: "postgres",
        password: process.env.RDS_PWD,
        database: "meta",
        host: process.env.RDS_HOST,
        dialect: "postgres",
    },
    development: {
        tag: "default",
        username: "postgres",
        password: process.env.RDS_PWD || "postgres",
        database: "meta",
        host: process.env.RDS_HOST || "127.0.0.1",
        dialect: "postgres",
    },
    staging: [
        {
            tag: "default",
            username: "postgres",
            password: "postgres",
            database: "meta",
            host: "127.0.0.1",
            dialect: "postgres",
        },
        {
            tag: "necc",
            username: "postgres",
            password: "postgres",
            database: "meta",
            host: "aal2s86owk3q6z.cj6662tynpu1.us-east-1.rds.amazonaws.com",
            dialect: "postgres",
        },
    ],
};
