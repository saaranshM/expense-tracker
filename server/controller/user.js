const UserService = require("../service/user");

class UserController {
  async createUser(req, res) {
    try {
      // getting user token from the service
      const token = await UserService.createUser(req.body);

      // sending user token to user after succesful registration
      res.status(201).json({ token });
    } catch (error) {
      console.log(error.message);

      // send unauthorized response if user already exists
      if (error.message === "user-exists") {
        return res.status(401).json({
          error: "user-exists",
          message: "user already exists",
        });
      }

      res.status(500).json({
        error: error.message,
      });
    }
  }

  async loginUser(req, res) {
    try {
      // getting user token from the service
      const token = await UserService.loginUser(req.body);

      // sending user token to user after succesful registration
      res.status(200).json({ token });
    } catch (error) {
      console.log(error.message);
      // send not found response if user is not found while loging in
      if (error.message === "not-found") {
        return res.status(404).json({
          error: "not-found",
          message: "User does not exist",
        });
      }

      // send invalid credentials if user enters wrong password
      if (error.message === "invalid-credentials") {
        return res.status(401).json({
          error: "invalid-credentials",
          message: "email or password is incorrect",
        });
      }
      res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = new UserController();
