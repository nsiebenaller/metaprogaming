const awsSdk = require("aws-sdk");

let AWS = null;

function configure() {
    if (AWS === null) {
        const { ACCESS_KEY_ID, SECRET_ACCESS_KEY } = process.env;
        if (!ACCESS_KEY_ID) {
            console.error("Missing access key id!");
            return null;
        }
        if (!SECRET_ACCESS_KEY) {
            console.error("Missing secret access key!");
            return null;
        }

        awsSdk.config.update({
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: SECRET_ACCESS_KEY,
            region: "us-east-1",
        });
        AWS = awsSdk;
    }
    return AWS;
}

module.exports = {
    configure,
};
