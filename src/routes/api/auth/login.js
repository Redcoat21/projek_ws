const { loginUser } = require("../../../controller/api/auth/login");
module.exports = (expressApp) => ({
    post: loginUser,
});
