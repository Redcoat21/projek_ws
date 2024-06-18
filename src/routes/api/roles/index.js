const { checkAccessToken, checkRole } = require("../../../middleware/token");
const { createOneRole } = require("../../../controller/api/role");
module.exports = (expressApp) => ({
    middleware: [checkAccessToken, checkRole("ADM")],
    post: createOneRole
});
