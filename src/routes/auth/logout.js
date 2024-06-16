const { logoutUser } = require("../../controller/api/auth");
module.exports = (expressApp) => ({
    post: logoutUser,
});
