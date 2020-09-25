require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const fileUpload = require("express-fileupload");
const AWS = require("aws-sdk");

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY } = process.env;
if (!ACCESS_KEY_ID) return console.error("Missing access key id!");
if (!SECRET_ACCESS_KEY) return console.error("Missing secret access key!");

// Configure AWS-SDK
AWS.config.update({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
function uploadFile(file) {
    return new Promise((resolve) => {
        const params = {
            Bucket: "metaprogaming",
            Key: file.name,
            Body: file.data,
            ACL: "public-read-write",
        };
        s3.putObject(params, (perr, pres) => {
            if (perr) {
                console.log("Error uploading data: ", perr);
                resolve(false);
            } else {
                console.log("Successfully uploaded data");
                resolve(true);
            }
        });
    });
}
module.exports = { uploadFile };

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
    next();
});

// REGISTER OUR ROUTES -------------------------------
buildRouter(router);
app.use("/api", router);

app.post("/api/upload", (req, res) => {
    const { file } = req.files;

    const params = {
        Bucket: "metaprogaming",
        Key: file.name,
        Body: file.data,
        ACL: "public-read-write",
    };
    s3.putObject(params, (perr, pres) => {
        if (perr) {
            console.log("Error uploading data: ", perr);
        } else {
            console.log("Successfully uploaded data to myBucket/myKey");
        }
        res.send({ success: true });
    });
});

app.get("/api/file", (req, res) => {
    const Key = req.query.fileName;
    const params = {
        Bucket: "metaprogaming",
        Key,
    };
    s3.getObject(params, (err, data) => {
        if (err) {
            return res.send(null);
        }
        res.write(data.Body, "binary");
        res.end(null, "binary");
    });
});

app.get("*", (req, res) => {
    const index = path.join(__dirname, "..", "..", "public", "index.html");
    res.sendFile(index);
});

// START THE SERVER -------------------------------
app.listen(port);
console.log(`App listening on ${port}`);
