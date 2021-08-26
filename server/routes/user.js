const router = require("express").Router();
const UserController = require("../controller/user");
const {
  validateNewUser,
  validateLoginUser,
} = require("../middleware/validators/userValidator");

// Route to register new user //
router.post("/register", validateNewUser, UserController.createUser);

//Route to login user//
router.post("/login", validateLoginUser, UserController.loginUser);

module.exports = router;
