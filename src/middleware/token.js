const { ACCESS_SECRET_KEY } = require("../config");

const checkAccessToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    try {
        const user = jwt.verify(accessToken, ACCESS_SECRET_KEY);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = {
    checkAccessToken,
};
