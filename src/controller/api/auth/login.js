const { validateLoginSchema } = require("../../../validation/api/auth/login");
const { getUser } = require("../../../service/user");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
        const { username, password } = validateLoginSchema.validate(
            req.body
        ).value;
        const user = await getUser(username);

        console.log(req.body);

        console.log(username);
        console.log(user.password);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ message: "Invalid password" });
        }

        user.password = undefined;

        const accessToken = await jwt.sign(user, ACCESS_SECRET_KEY, {
            expiresIn: "1h",
        });

        return res.status(200).json({
            message: "Logged in succesfully",
            data: {
                user: user,
                token: accessToken,
            },
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    loginUser,
};
