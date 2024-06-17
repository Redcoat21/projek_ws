const { updateSaldo } = require("../../../../controller/api/updateUser");
const { checkPermission } = require("../../../../middleware/access");
const { checkAccessToken, checkMoreRole } = require("../../../../middleware/token");
const { checkSaldo } = require("../../../../middleware/type");

module.exports = (expressApp) => ({
    middleware: [checkAccessToken,  checkMoreRole("USR,ADM"), checkPermission, checkSaldo],
    patch: updateSaldo
});