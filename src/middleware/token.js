const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../config");
const { createToken } = require("../service/token");
const jwt = require("jsonwebtoken");
const { getUser } = require("../service/user");

//TODO Clean this up and find better way to handle this.
const checkAccessToken = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    try {
        // Check whether the access token exist and not expired.
        const user = jwt.verify(accessToken, ACCESS_SECRET_KEY);
        const { iat, exp, ...filteredUser } = user;
        req.user = filteredUser;
        next();
    } catch (error) {
        // If the access token exist, that must be means the token is expired.
        if (accessToken) {
            const decoded = jwt.verify(accessToken, ACCESS_SECRET_KEY, {
                ignoreExpiration: true,
            });

            const userData = await getUser(decoded.username);

            // Check if the refresh token exist
            if (userData.refreshToken) {
                // Create a new access token if the refresh token exist.
                const newAccessToken = createToken(
                    { username: userData.username, role: userData.role },
                    "ACCESS",
                    "15m"
                );

                res.cookie("accessToken", newAccessToken);
                req.user = jwt.verify(newAccessToken, ACCESS_SECRET_KEY);
                return next();
            }
        }
        return res.status(401).json({ message: "Unauthorized" });
    }
};

const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};

module.exports = {
    checkAccessToken,
    checkRole,
};
