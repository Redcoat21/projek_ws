const { getProducts } = require("../../controller/api/admin")
module.exports = (expressApp) => ({
  get: getProducts,
})
