const { checkAccessToken, checkRole } = require("../../../middleware/token");
const { createOneTier } = require("../../../controller/api/tier");
const { getAdminTier } = require("../../../controller/api/getAdmin")

module.exports = (expressApp) => ({
    middleware: [checkAccessToken, checkRole("ADM")],
    post: createOneTier,
    get: getAdminTier
});
