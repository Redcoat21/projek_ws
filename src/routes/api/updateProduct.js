const { updateSellerProduct } = require("../../controller/api/seller")
module.exports = (expressApp) => ({
  put: updateSellerProduct,
})
