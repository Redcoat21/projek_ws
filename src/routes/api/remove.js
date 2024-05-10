const { deletetsellerproduct } = require("../../controller/api/seller");
module.exports = (expressApp) => ({
  delete: deletetsellerproduct,
});
