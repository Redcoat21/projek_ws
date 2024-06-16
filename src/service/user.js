const { User } = require("../model");
const bcrypt = require("bcrypt");

const getUser = async (username) => {
    return await User.findByPk(username);
};

const createUser = async (data, transaction = undefined) => {
    const { username, name, email, password, phone, role, refreshToken } = data;
    const user = await getUser(username);

    if (user) {
        throw new Error("User already exists!");
    }

    try {
        return await User.create({
            username,
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            phoneNumber: phone,
            name,
            role,
            refreshToken,
        }, {
            transaction: transaction
        });
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getUser,
    createUser,
};
