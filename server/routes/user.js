const router = require("express").Router();
const UserController = require("../controller/user");

// Route to register new user //
router.post("/register", UserController.createUser);

//Route to login user//
router.post("/login", UserController.loginUser);

module.exports = router;
