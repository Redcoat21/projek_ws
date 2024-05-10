const { noDoubleNestedGroup } = require("sequelize/lib/utils/deprecations");
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

const verifyAsync = util.promisify(jwt.verify);

const decodeToken = async (data) => {
    try{
        const decoded = await verifyAsync(data, ACCESS_SECRET_KEY);
        const { iat, exp, ...filteredData } = decoded;
        return filteredData;
    }
    catch{
        return null
    }
}

module.exports = {
    createToken,
    decodeToken,
};
