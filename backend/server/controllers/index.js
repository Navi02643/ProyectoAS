const express = require("express");
const app = express();

app.use("/user", require("./user.controller"));


module.exports = app;