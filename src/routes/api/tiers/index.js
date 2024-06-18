const { checkAccessToken, checkRole } = require("../../../middleware/token");
const { createOneTier } = require("../../../controller/api/tier");

module.exports = (expressApp) => ({
    middleware: [checkAccessToken, checkRole("ADM")],
    post: createOneTier
});
