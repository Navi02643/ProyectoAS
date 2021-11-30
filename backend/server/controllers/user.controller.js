const usermodel = require("../models/user");
const express = require("express");
const jwt = require("jsonwebtoken");
const keys = require("../middlewares/keys");
const bcrypt = require("bcryptjs");
const Users = require('../validation/Login&Registes');
const app = express();


app.post("/register", Users.createUser);

app.post("/login", Users.loginUser);
  
app.put("/", async (req, res) => {
    try {
      const idUser = req.query.idUser;
      if (req.query.idUser == "") {
        return res.status(400).send({
          estatus: "400",
          err: true,
          msg: "Error: A valid id was not sent.",
          cont: 0,
        });
      }
      req.body._id = idUser;
      const Userfind = await usermodel.findById(idUser);
      if (!Userfind) {
        return res.status(404).send({
          estatus: "404",
          err: true,
          msg: "Error: The user was not found in the database.",
          cont: Userfind,
        });
      }
      const newuser = new usermodel(req.body);
      let err = newuser.validateSync();
      if (err) {
        return res.status(400).json({
          ok: false,
          resp: 400,
          msg: "Error: Error inserting user.",
          cont: {
            err,
          },
        });
      }
      const userupdate = await usermodel.findByIdAndUpdate(
        idUser,
        { $set: newuser },
        { new: true }
      );
      if (!userupdate) {
        return res.status(400).json({
          ok: false,
          resp: 400,
          msg: "Error: Trying to update the user.",
          cont: 0,
        });
      } else {
        return res.status(200).json({
          ok: true,
          resp: 200,
          msg: "Success: The user was updated successfully.",
          cont: {
            Userfind,
          },
        });
      }
    } catch (err) {
      res.status(500).send({
        estatus: "500",
        err: true,
        msg: "Error: Error updating user.",
        cont: {
          err: Object.keys(err).length === 0 ? err.message : err,
        },
      });
    }
  });

app.delete("/", async (req, res) => {
    try {
      if (req.query.idUser == "") {
        return res.status(400).send({
          estatus: "400",
          err: true,
          msg: "Error: A valid id was not sent.",
          cont: 0,
        });
      }
      idUser = req.query.idUser;
      status = req.body.status;
      const userfind = await usermodel.findById(idUser);
      if (!userfind) {
        return res.status(404).send({
          estatus: "404",
          err: true,
          msg: "Error: The user cannot be found in the database.",
          cont: userfind,
        });
      }
      const userupdate = await usermodel.findByIdAndUpdate(
        idUser,
        { $set: { status: status } },
        { new: true }
      );
      if (!userupdate) {
        return res.status(400).json({
          ok: false,
          resp: 400,
          msg: "Error: when trying to delete the user.",
          cont: 0,
        });
      } else {
        return res.status(200).json({
          ok: true,
          resp: 200,
          msg: `Success: Se a ${
            status === "true" ? "Activate" : "Delete"
          } the user`,
        });
      }
    } catch (err) {
      res.status(500).send({
        estatus: "500",
        err: true,
        msg: "Error: Failed to delete user.",
        cont: {
          err: Object.keys(err).length === 0 ? err.message : err,
        },
      });
    }
  });



module.exports = app;