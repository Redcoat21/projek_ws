require("dotenv").config();
const app = require("./app");
const registerRoute = require("../utility/app");

const { APP_PORT } = require("./config");

app.listen(APP_PORT, () => {
    console.log(`Server running on port ${APP_PORT}`);
});
