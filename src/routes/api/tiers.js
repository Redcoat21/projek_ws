const { getAdminTier } = require("../../controller/api/getAdmin")
const { checkAccessToken, checkRole } = require("../../middleware/token")

module.exports = (expressApp) => ({
    middleware: [checkAccessToken, checkRole("ADM")],
    get: getAdminTier
})