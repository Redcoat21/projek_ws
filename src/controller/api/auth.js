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
    const { value, error } = validateRegisterSchema.validate(req.body);

    if(error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }


    const {
        username,
        password,
        email,
        phone_number: phone,
        role,
        name,
        address
    } = value;

    const newUser = await createUser({
        username,
        password,
        email,
        phone,
        role,
        name,
        address
    });

    return res.status(201).json({
        message: "Registered succesfully",
        data: {
            username: newUser.username,
            name: newUser.name,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
            profilePicture: newUser.profilePicture,
            balance: newUser.balance,
            address: address
        },
    });
};

//TODO Clean this up
const loginUser = async (req, res) => {

    try {
        jwt.verify(req.cookies.accessToken, ACCESS_SECRET_KEY);
        return res.status(200).json({ message: "Already logged in!" });
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

const logoutUser = async (req, res) => {
    try {
        jwt.verify(req.cookies.accessToken, ACCESS_SECRET_KEY);
        res.clearCookie("accessToken");
        return res.status(200).json({ message: "Logged out succesfully" });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Not logged in yet" });
    }
}

module.exports = {
    loginUser,
    registerUser,
    logoutUser
};
