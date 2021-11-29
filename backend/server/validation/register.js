const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.useremail = !isEmpty(data.useremail) ? data.useremail : "";
  data.userpassword = !isEmpty(data.userpassword) ? data.userpassword : "";

  // Name checks
  if (Validator.isEmpty(data.username)) {
    errors.infoError = "Username field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.useremail)) {
    errors.infoError = "Email field is required";
  } else if (!Validator.isEmail(data.useremail)) {
    errors.infoError = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.userpassword)) {
    errors.infoError = "Password field is required";
  }
  // if (Validator.isEmpty(data.confirmPass)) {
  //   errors.infoError = "Confirm password field is required";
  // }

  // if (!Validator.isLength(data.userpassword, { min: 6, max: 20 })) {
  //   errors.infoError = "Password must be at least 6 characters";
  // }

  // if (!Validator.equals(data.password, data.confirmPass)) {
  //   errors.infoError = "Passwords must match";
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
