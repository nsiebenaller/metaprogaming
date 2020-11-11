const awsManager = require("./awsManager");

const AWS = awsManager.configure();
const s3 = new AWS.S3();
const Bucket = process.env.BUCKET;

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

function removeFile(Key) {
    return new Promise((resolve) => {
        const params = {
            Bucket: "metaprogaming",
            Key,
        };
        s3.deleteObject(params, (err, data) => {
            if (err) {
                console.log("Error deleting data: ", err);
                resolve(false);
            } else {
                console.log("Successfully deleted data");
                resolve(true);
            }
        });
    });
}

module.exports = {
    uploadFile,
    removeFile,
    Bucket,
};
