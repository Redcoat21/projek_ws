const { getAllProduct } = require("../../controller/api/admin")
module.exports = (expressApp) => ({
  get: getAllProduct,
})
