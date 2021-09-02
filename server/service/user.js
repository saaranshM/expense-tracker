const UserDAO = require("../dao/user");
const jwtGenerator = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");
const verifyRefreshToken = require("../utils/verifyRefreeshToken");
const client = require("../redis/redisInit");
const { mapKeys, snakeCase } = require("lodash");

class UserService {
  async createUser(userDto) {
    const { firstName, lastName, email, password } = userDto;

    // creating a new user
    const userId = await UserDAO.createUser(email, password);
    // throw error if user was not created
    if (!userId) {
      throw new Error("error-creating-user");
    }

    // adding profile of user
    const userProfile = await UserDAO.addUserProfile(
      userId,
      firstName,
      lastName
    );

    // throw error if profile was not created
    if (!userProfile) {
      throw new Error("error-creating-profile");
    }

    // generate auth and refresh token
    const accessToken = await jwtGenerator(userId);
    const refreshToken = await jwtGenerator(userId, "refresh");

    // return the tokens to the controller
    return { accessToken, refreshToken };
  }
  async loginUser(userDto) {
    const { email, password } = userDto;
    const user = await UserDAO.loginUser(email, password);

    if (!user) {
      throw new Error("error-loging-in");
    }

    if (user.length < 1) {
      throw new Error("not-found");
    }

    // check if password is valid
    const isPasswordValid = await bcrypt.compare(
      password,
      user[0].user_password
    );

    // throw invalid-credentials error if password is not valid
    if (!isPasswordValid) {
      throw new Error("invalid-credentials");
    }

    // generate auth and refresh token
    const accessToken = await jwtGenerator(user[0].user_id);
    const refreshToken = await jwtGenerator(user[0].user_id, "refresh");

    // return the tokens to the controller
    return { accessToken, refreshToken };
  }

  async logoutUser(token) {
    // get refresh token from header
    const userRefreshToken = token.split(" ")[1];

    // verify refresh token and get user
    const userId = await verifyRefreshToken(userRefreshToken);

    // if user is not found throw no user to logout error
    if (userId === "not-found") {
      throw new Error("invalid-logout");
    }

    // if user is found del user's refresh token from redis
    client.DEL(userId, (error, result) => {
      if (error) throw new Error("redis-del-error");
    });
  }

  async refreshToken(token) {
    // get refresh token from header
    const userRefreshToken = token.split(" ")[1];

    // verify refresh token and get user
    const userId = await verifyRefreshToken(userRefreshToken);

    // generate access token and refresh token
    const accessToken = jwtGenerator(userId);
    const refreshToken = jwtGenerator(userId);

    // return the tokens to the controller
    return { accessToken, refreshToken };
  }

  async addUserDetails({ monthlyIncome, payDate, bankBalance }, token) {
    // get refresh token from header
    const userRefreshToken = token.split(" ")[1];

    // verify refresh token and get user
    const userId = await verifyRefreshToken(userRefreshToken);
    const incomeDetails = mapKeys(
      { userId, monthlyIncome, payDate },
      (value, key) => snakeCase(key)
    );
    const bankDetails = mapKeys({ userId, bankBalance }, (value, key) =>
      snakeCase(key)
    );

    await UserDAO.addUserDetails(incomeDetails, bankDetails);
  }
}

module.exports = new UserService();
