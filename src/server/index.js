require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const fileUpload = require("express-fileupload");
const awsManager = require("./managers/awsManager");
const fileManager = require("./managers/fileManager");

// Configure AWS-SDK
const AWS = awsManager.configure();
if (AWS === null) {
    console.error("Could not configure AWS");
    return;
}

const buildRouter = require("./routes");

const app = express(); // define our app using express
const port = process.env.PORT || 3000; // set our port

// configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static("public"));
app.use(express.static("dist"));
app.use(cookieParser());

// ROUTES FOR OUR API
const router = express.Router();

// middleware to use for all requests
router.use((req, res, next) => {
    if (!req.files) req.files = {};

    Object.keys(req.files).forEach((key) => {
        const file = req.files[key];
        req.files[key] = { ...file, name: file.name.replace(" ", "_") };
    });

    next();
});

// REGISTER OUR ROUTES -------------------------------
buildRouter(router);
app.use("/api", router);
app.get("/api/env", async (req, res) => {
    res.json({
        theme: process.env.THEME,
        bucket: process.env.BUCKET,
    });
});

// Handle S3 file requests
app.get("/s3/*", async (req, res) => {
    const key = req.originalUrl.replace("/s3/", "");
    try {
        const resp = await fileManager.getFile(key);
        return res.send(resp.Body);
    } catch (err) {
        console.error(err);
        return res.send(undefined);
    }
});

app.get("*", (req, res) => {
    const index = path.join(__dirname, "..", "..", "public", "index.html");
    res.sendFile(index);
});

// START THE SERVER -------------------------------
app.listen(port);
console.log(`App listening on ${port}`);
