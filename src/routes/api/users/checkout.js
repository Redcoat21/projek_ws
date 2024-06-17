const { checkout } = require("../../../controller/api/user");
const { checkAccessToken } = require("../../../middleware/token");
module.exports = (expressApp) => ({
    middleware: checkAccessToken,
    post: checkout
})
