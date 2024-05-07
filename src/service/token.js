const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../config");
const createToken = (data, type = "ACCESS", expiresIn = "15m") => {
    const secret = type === "ACCESS" ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;
    const expiresTime = type === "ACCESS" ? "15m" : "7d";

    return (createToken = jwt.sign(data, secret, {
        expiresIn: expiresIn,
    }));
};

module.exports = {
    createToken,
};
