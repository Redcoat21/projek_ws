const { checkAccessToken, checkRole } = require("../../../middleware/token");
const { createOneRole } = require("../../../controller/api/role");
const { getAdminRole } = require("../../../controller/api/getAdmin")

module.exports = (expressApp) => ({
    middleware: [checkAccessToken, checkRole("ADM")],
    post: createOneRole,
    get: getAdminRole
});
