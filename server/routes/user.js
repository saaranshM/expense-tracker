const router = require("express").Router();
const UserController = require("../controller/user");
const {
  validateNewUser,
  validateLoginUser,
} = require("../middleware/validators/userValidator");
const auth = require("../middleware/auth/auth");
const { tokenValidator } = require("../middleware/validators/tokenValidator");
const UserService = require("../service/user");

// dummy procted Route //
router.get("/protected", auth, (req, res) => {
  console.log(req.user);
  res.send("Protected data!");
});

// Route to register new user //
router.post("/register", validateNewUser, UserController.createUser);

//Route to login user//
router.post("/login", validateLoginUser, UserController.loginUser);

//Route to login user//
router.post("/logout", tokenValidator, UserController.logoutUser);

// Route to refresh access token //
router.post("/refresh-token", tokenValidator, UserController.refreshToken);

module.exports = router;
