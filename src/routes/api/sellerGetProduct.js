const { sellerProducts } = require("../../controller/api/seller");
module.exports = (expressApp) => ({
  get: sellerProducts,
});
