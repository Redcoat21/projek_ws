const { updateData } = require("../../../controller/api/updateUser");
const { checkPermission } = require("../../../middleware/access");
const { checkAccessToken } = require("../../../middleware/token");

module.exports = (expressApp) => ({
    middleware: [checkAccessToken, checkPermission],
    put: updateData
});