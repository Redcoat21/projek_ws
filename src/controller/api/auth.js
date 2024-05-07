const {
    validateLoginSchema,
    validateRegisterSchema,
} = require("../../validation/api/auth");
const { getUser, createUser } = require("../../service/user");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../../config");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const {
            username,
            password,
            email,
            phone_number: phone,
            role,
            name,
        } = validateRegisterSchema.validate(req.body).value;
        const newUser = await createUser({
            username,
            password,
            email,
            phone,
            role,
            name,
        });

        return res.status(201).json({
            message: "Registered succesfully",
            data: newUser,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const {
            username,
            password,
            remember_me: rememberMe,
        } = validateLoginSchema.validate(req.body).value;

        if (remember_me) {
            // Use the already existed Access Token or create a new one
        } else {
            const user = await getUser(username);

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
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    loginUser,
    registerUser,
};
