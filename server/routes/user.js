const router = require("express").Router();
const UserController = require("../controller/user");
const {
  validateNewUser,
  validateLoginUser,
  validateUserDetails,
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

//Route to logout user//
router.post("/logout", tokenValidator, UserController.logoutUser);

// Route to refresh access token //
router.post("/refresh-token", tokenValidator, UserController.refreshToken);

// Route to add user details
router.post(
  "/details",
  validateUserDetails,
  auth,
  UserController.addUserDetails
);

// Route to get user details
router.get("/details", auth, UserController.getUserDetails);

module.exports = router;
