const { User } = require("../model");
const getUser = async (username) => {
    return await User.findByPk(username);
};

module.exports = {
    getUser,
};
