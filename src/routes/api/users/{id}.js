const { updateData } = require("../../../controller/api/updateUser");
const { checkPermission } = require("../../../middleware/access");
const { checkAccessToken, checkRole } = require("../../../middleware/token");
const { getOneUser, deleteOneUser } = require("../../../controller/api/user");

module.exports = (expressApp) => ({
    middleware: [checkAccessToken, checkRole("ADM", "USR")],
    put: updateData,
    get: getOneUser,
    delete: deleteOneUser,
});