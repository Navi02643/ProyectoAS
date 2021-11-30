const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
  },
  userlastname: {
    type: String,
  },
  useremail: {
    type: String,
  },
  userphonenumber: {
    type: String,
  },
  useridrole: {
    type: Schema.Types.ObjectId,
    ref: "Role",
  },
  userpassword: {
    type: String,
  },
  userstatus: {
    type: Boolean,
    default: true,
  },
});

module.exports = userSchema;