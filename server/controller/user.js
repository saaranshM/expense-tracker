const UserService = require("../service/user");

class UserController {
  async createUser(req, res) {
    try {
      // getting user token from the service
      const tokens = await UserService.createUser(req.body);

      // sending user token to user after succesful registration
      res.status(201).json(tokens);
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
      const tokens = await UserService.loginUser(req.body);

      // sending user token to user after succesful registration
      res.status(200).json(tokens);
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

  async logoutUser(req, res) {
    try {
      // call the logout user service
      await UserService.logoutUser(req.header("Authorization"));

      // send status 204 if user successfully logs out
      res.sendStatus(204);
    } catch (error) {
      // send response 400 if no user to logout
      console.log("ERROR:", error.message);
      if (error.message === "invalid-token") {
        return res.status(403).json({
          error: "invalid-token",
          message: "token is invalid",
        });
      }
      if (error.message === "invalid-user-refresh-token") {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async refreshToken(req, res) {
    try {
      const tokens = await UserService.refreshToken(
        req.header("Authorization")
      );

      res.status(200).json(tokens);
    } catch (error) {
      if (
        error.message === "invalid-token" ||
        error.message === "invalid-user-refresh-token"
      ) {
        return res.status(403).json({
          error: error.message,
          message: "token is invalid",
        });
      }
      console.log(error);
      res.status(500).json({
        error: error.message,
      });
    }
  }

  async addUserDetails(req, res) {
    try {
      const userId = req.user;
      const body = req.body;

      await UserService.addUserDetails(body, userId);
      res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error: error.message,
      });
    }
  }

  async getUserDetails(req, res) {
    try {
      const uid = req.user;
      const userDetails = await UserService.getUserDetails(uid);
      res.status(200).json(userDetails);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = new UserController();
