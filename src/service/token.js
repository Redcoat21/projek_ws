const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");
const util = require('util');

const createToken = (data, type = "ACCESS", expiresIn = "15m") => {
    const secret = type === "ACCESS" ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;
    const expiresTime = expiresIn;

    return jwt.sign(data, secret, {
        expiresIn: expiresTime,
    });
};

module.exports = {
    createToken,
};
