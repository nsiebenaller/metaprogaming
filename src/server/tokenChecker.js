const expressJWT = require("express-jwt");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET || "secret"; // set secret for jwt

const tokenChecker = {
    secret,
    algorithms: ["HS256"],
    getToken: (req) => {
        const token = req.cookies.meta_token;
        if (!token) return null;
        const verifiedToken = jwt.verify(token, secret);
        if (!verifiedToken) return false;
        const { exp, revoked } = verifiedToken;
        if (!exp) return false;

        // Check revoked
        if (revoked) return false;

        // Check expired
        const now = new Date().getTime();
        const expire = parseInt(exp * 1000);
        if (expire < now) return false;

        return token;
    },
};

module.exports = {
    tokenChecker: expressJWT(tokenChecker),
};
