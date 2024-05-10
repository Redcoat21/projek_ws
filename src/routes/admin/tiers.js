const { getAdminTier } = require("../../controller/api/getAdmin")

module.exports = (expressApp) => ({
    get: getAdminTier
})