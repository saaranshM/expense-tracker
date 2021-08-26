const router = require("express").Router();
const UserController = require("../controller/user");
const {
  validateNewUser,
  validateLoginUser,
} = require("../middleware/validators/userValidator");

const { tokenValidator } = require("../middleware/validators/tokenValidator");

// Route to register new user //
router.post("/register", validateNewUser, UserController.createUser);

//Route to login user//
router.post("/login", validateLoginUser, UserController.loginUser);

// Route to refresh access token //
router.post("/refresh-token", tokenValidator, UserController.refreshToken);

module.exports = router;
