const { getProduct } = require("../../controller/api/admin");
module.exports = (expressApp) => ({
  get: getProduct,
});
