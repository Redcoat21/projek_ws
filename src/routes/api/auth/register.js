const { registerUser } = require("../../../controller/api/auth");
module.exports = (expressApp) => ({
    post: registerUser,
});
