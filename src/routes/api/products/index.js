const { checkAccessToken, checkRole } = require("../../../middleware/token");
const { getAllProduct } = require("../../../controller/api/admin")
const { AddsellerProduct } = require("../../../controller/api/seller")

module.exports = (expressApp) => ({
    middleware: [checkAccessToken],
    get: getAllProduct,
    post: AddsellerProduct
});
