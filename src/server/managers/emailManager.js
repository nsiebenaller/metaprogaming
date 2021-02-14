const awsManager = require("./awsManager");

const AWS = awsManager.configure();
const mailer = new AWS.SES({ apiVersion: "2010-12-01" });

async function sendEmail(to = [], subject = "", message = "", html = false) {
    const email = html ? createHTMLEmail() : createEmail();
    email.Destination.ToAddresses = to;
    email.Message.Subject.Data = subject;

    if (html) {
        email.Message.Body.Html.Data = message;
    } else {
        email.Message.Body.Text.Data = message;
    }

    console.log("Sending messages to " + to.join(", "));
    console.log("Message: " + JSON.stringify(email));
    try {
        await mailer.sendEmail(email).promise();
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

function createEmail() {
    return {
        Destination: {
            CcAddresses: [],
            ToAddresses: [],
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: "",
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "",
            },
        },
        Source: "noreply@meta-team.net",
        ReplyToAddresses: [],
    };
}

function createHTMLEmail() {
    return {
        Destination: {
            CcAddresses: [],
            ToAddresses: [],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: "",
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "",
            },
        },
        Source: "noreply@meta-team.net",
        ReplyToAddresses: [],
    };
}

module.exports = {
    sendEmail,
};
