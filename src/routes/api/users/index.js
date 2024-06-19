const { checkAccessToken, checkRole } = require("../../../middleware/token");
const { getManyUser, createOneUser } = require("../../../controller/api/user");
module.exports = (expressApp) => ({
    middleware: [checkAccessToken, checkRole("ADM")],
    get: getManyUser,
    post: createOneUser
});
