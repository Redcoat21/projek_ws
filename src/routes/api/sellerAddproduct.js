const { AddsellerProduct } = require("../../controller/api/seller")
module.exports = (expressApp) => ({
  post: AddsellerProduct,
})
