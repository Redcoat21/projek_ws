const { checkAccessToken, checkRole } = require("../../../../middleware/token");
const { getProducts } = require("../../../../controller/api/admin")
const { deletetsellerproduct, updateSellerProduct } = require("../../../../controller/api/seller")

module.exports = (expressApp) => ({
    middleware: [checkAccessToken, checkRole("ADM", "SLR")],
    get: getProducts,
    delete: deletetsellerproduct,
    put: updateSellerProduct
});
