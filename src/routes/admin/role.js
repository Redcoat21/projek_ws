const { getAdminRole } = require("../../controller/api/getAdmin")
module.exports = (expressApp) => ({
    get: getAdminRole
})