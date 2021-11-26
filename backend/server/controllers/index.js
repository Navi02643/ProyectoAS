const express = require("express");
const app = express();

app.use("/user", require("./user.controller"));
app.use("/projects", require("./projects.controller"));
app.use("/homework", require("./homeworks.controller"));
app.use("/history", require("./history.controller"));
app.use("/role", require("./role.controller"));

module.exports = app;