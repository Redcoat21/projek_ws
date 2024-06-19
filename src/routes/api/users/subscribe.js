const { subscribe } = require("../../../controller/api/user");
const { checkAccessToken, checkRole } = require("../../../middleware/token");
module.exports = (expressApp) => ({
    middleware: [checkAccessToken, checkRole("USR")],
    post: subscribe
})
