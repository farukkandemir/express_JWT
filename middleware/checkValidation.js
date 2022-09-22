const {check} = require("express-validator");

const registerIsValid = () => {
  return [
    check("username")
      .isLength({min: 5})
      .withMessage("Username must be at least 5 char")
      .exists()
      .withMessage("Username is required")
      .trim(),

    check("email").isEmail().withMessage("Please provide a proper email"),
    check("password")
      .isLength({min: 5})
      .withMessage("Password should be at least 5 char"),
  ];
};

module.exports = registerIsValid;
