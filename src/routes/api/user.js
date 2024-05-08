const { checkAccessToken } = require("../../middleware/token");

module.exports = (expressApp) => ({
    get: (request, response) => {
        response.status(200).send("Hello, Route").end();
    },
});
