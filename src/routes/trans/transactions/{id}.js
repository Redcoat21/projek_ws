const { getOneTransaction } = require("../../../controller/api/transaction");
const { checkAccessToken, checkMoreRole } = require("../../../middleware/token");

module.exports = (expressApp) => ({
    middleware: [checkAccessToken, checkMoreRole("USR,SLR")],
    get: getOneTransaction
});