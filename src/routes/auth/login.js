const { loginUser } = require("../../controller/api/auth");
module.exports = (expressApp) => ({
    post: loginUser,
});
