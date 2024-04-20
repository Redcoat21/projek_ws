const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const { registerRoute } = require("../../utility/app/route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

registerRoute(app);

module.exports = app;
