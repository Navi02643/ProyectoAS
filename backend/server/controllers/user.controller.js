const usermodel = require("../models/user");
const express = require("express");
const jwt = require("jsonwebtoken");
const keys = require("../middlewares/keys");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/register");
const app = express();


app.post("/", async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    usermodel.findOne({ useremail: req.body.useremail }).then((user) => {
      if (user) {
        return res.status(400).json({ infoError: "Email already exists" });
      } else {
        const newUser = new usermodel({
          username: req.body.username,
          userlastname: req.body.userlastname,
          useremail: req.body.useremail,
          userphonenumber: req.body.userphonenumber,
          useridrole: req.body.useridrole,
          userpassword: req.body.userpassword,
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.userpassword, salt, (err, hash) => {
            if (err) throw err;
            newUser.userpassword = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  });
  
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

app.post("/login", async (req, res) => {
    //////// FORM VALIDATION
    const { errors, isValid } = validateLoginInput(req.body);
  
    //////// CHECK VALIDATION
    if (!isValid) {
       return res.status(400).json(errors);
    }
   
     const useremail = req.body.useremail;
     const userpassword = req.body.userpassword;
   
     ///////// FIND USER BY EMAIL
     usermodel.findOne({ useremail }).then(user => {
       /////// CHECK IF USER EXISTS
       if (!user) {
         return res.status(404).json({ infoError: "Email not found" });
       }
      
       /////// CHECK PASSWORD
       bcrypt.compare(userpassword, user.userpassword).then(isMatch => {
         if (isMatch) {
           // USER MATCHED
           // CREATE JWT PAYLOAD
           const payload = {
             id: user.id,
             username: user.username,
             userastname: user.userlastname,
             useremail: user.useremail,
           };
   
           // SIGN TOKEN
           jwt.sign(
             payload,
             keys.secretOrKey,
             {
               expiresIn: 100 
             },
             (err, token) => {
               res.json({
                id: user.id,
                username: user.username,
                userastname: user.userlastname,
                useremail: user.useremail,
               });
             }
           );
         } else {
           return res
             .status(400)
             .json({ infoError: "Password incorrect" });
         }
       });
     });
  });

module.exports = app;