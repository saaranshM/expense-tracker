const { check, validationResult } = require("express-validator");

exports.validateNewUser = [
  // req body validation for new user //

  // check if email is valid
  check("email")
    .exists({ checkFalsy: true })
    .normalizeEmail()
    .isEmail()
    .withMessage("email is not valid")
    .bail(),

  // check id password is valid
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("password is not valid")
    .bail()
    .isLength({ min: 8 })
    .withMessage("password should be a minimum of 8 characters")
    .bail(),

  // check if first name is valid
  check("firstName")
    .exists({ checkFalsy: true })
    .trim()
    .escape()
    .withMessage("first name is not valid")
    .bail()
    .isLength({ min: 2 })
    .withMessage("first name should be a minimum of 2 characters")
    .bail(),

  // check if last name is valid
  check("lastName")
    .exists()
    .trim()
    .escape()
    .withMessage("last name is not valid")
    .bail(),

  // respond with errors object if any of the fields are not valid
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

exports.validateLoginUser = [
  // check if email is valid
  check("email")
    .exists({ checkFalsy: true })
    .normalizeEmail()
    .isEmail()
    .withMessage("email is not valid")
    .bail(),

  // check id password is valid
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("password is not valid")
    .bail()
    .isLength({ min: 8 })
    .withMessage("password should be a minimum of 8 characters")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
