const {
    validateLoginSchema,
    validateRegisterSchema,
} = require("../../validation/api/auth");
const { getUser, createUser } = require("../../service/user");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createToken } = require("../../service/token");

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
            data: {
                username: user.username,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                profilePicture: user.profilePicture,
                balance: user.balance,
            },
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

//TODO Clean this up
const loginUser = async (req, res) => {
    res.clearCookie("accessToken");
    try {
        jwt.verify(req.cookies.accessToken, ACCESS_SECRET_KEY);
    } catch (error) {
        console.error(error);
    }

    try {
        const {
            username,
            password,
            remember_me: rememberMe,
        } = validateLoginSchema.validate(req.body).value;
        const user = await getUser(username);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const tempUser = { username: user.username, role: user.role };

        const accessToken = createToken(tempUser, "ACCESS", "15m");

        // Save accessToken to cookie for 15 minutes
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
        });

        // If rememberMe is checked (True) create a refresh token and store it into the database
        const refreshToken = rememberMe
            ? createToken(tempUser, "REFRESH", "999y")
            : null;

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({
            message: "Logged in succesfully",
            data: {
                user: {
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    profilePicture: user.profilePicture,
                    balance: user.balance,
                },
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    loginUser,
    registerUser,
};
