const { validationResult, header } = require("express-validator");

exports.tokenValidator = [
  header("Authorization")
    .exists({ checkFalsy: true })
    .withMessage("token does not exists")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
