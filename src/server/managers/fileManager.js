const awsManager = require("./awsManager");

const AWS = awsManager.configure();
const s3 = new AWS.S3();
const Bucket = process.env.BUCKET;
const Dir = process.env.ROOT_DIR || process.env.THEME || "generic";

function uploadFile(file) {
    return new Promise((resolve) => {
        const key = `${Dir}/${file.name}`;
        const params = {
            Bucket: "metaprogaming",
            Key: key,
            Body: file.data,
            ACL: "public-read-write",
        };
        s3.putObject(params, (perr, pres) => {
            if (perr) {
                console.log("Error uploading data: ", perr);
                resolve({ success: false, key: `${Bucket}${key}` });
            } else {
                console.log("Successfully uploaded data");
                resolve({ success: true, key: `${Bucket}${key}` });
            }
        });
    });
}

function removeFile(Key) {
    return new Promise((resolve) => {
        const params = {
            Bucket: "metaprogaming",
            Key: Key.replace(Bucket, ""),
        };
        s3.deleteObject(params, (err, data) => {
            if (err) {
                console.log("Error deleting data: ", err);
                resolve({ success: false, messages: [err] });
            } else {
                console.log("Successfully deleted data");
                resolve({ success: true, messages: [] });
            }
        });
    });
}

function getExt(fileName) {
    try {
        const re = /(?:\.([^.]+))?$/;
        const ext = re.exec(fileName)[1];
        return ext;
    } catch (err) {
        console.error(err);
        return undefined;
    }
}

module.exports = {
    uploadFile,
    removeFile,
    getExt,
};
