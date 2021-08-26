const { check, validationResult } = require("express-validator");

exports.tokenValidator = [
  check("Authorization")
    .exists({ checkFalsy: true })
    .withMessage("token is does not exists")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
