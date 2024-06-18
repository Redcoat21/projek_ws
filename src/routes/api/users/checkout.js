const { checkout } = require("../../../controller/api/user");
const { checkAccessToken, checkRole } = require("../../../middleware/token");
module.exports = (expressApp) => ({
    middleware: [checkAccessToken, checkRole("USR")],
    post: checkout
})
